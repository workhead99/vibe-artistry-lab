import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

const submissionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
  budget: z.string().trim().min(1).max(60),
  service: z.string().trim().min(1).max(60),
  about: z.string().trim().min(10).max(1000),
  file: z
    .object({
      name: z.string().trim().min(1).max(200),
      type: z.string().trim().max(100),
      dataBase64: z.string().max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 1024),
    })
    .nullable()
    .optional(),
});

export type BriefSubmission = z.infer<typeof submissionSchema>;

export const submitBrief = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let attachmentPath: string | null = null;
    let attachmentName: string | null = null;

    if (data.file) {
      const bytes = Uint8Array.from(atob(data.file.dataBase64), (c) => c.charCodeAt(0));
      if (bytes.byteLength > MAX_FILE_BYTES) {
        throw new Error("File is larger than 8MB");
      }
      const safeName = data.file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("briefs")
        .upload(path, bytes, {
          contentType: data.file.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) throw new Error(uploadError.message);
      attachmentPath = path;
      attachmentName = data.file.name;
    }

    const { data: row, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        service: data.service,
        about: data.about,
        attachment_path: attachmentPath,
        attachment_name: attachmentName,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    let attachmentUrl: string | null = null;
    if (attachmentPath) {
      const { data: signed } = await supabaseAdmin.storage
        .from("briefs")
        .createSignedUrl(attachmentPath, 60 * 60 * 24 * 30);
      attachmentUrl = signed?.signedUrl ?? null;
    }

    let emailed = false;
    try {
      const { notifyBriefOwner } = await import("./brief-notify.server");
      emailed = await notifyBriefOwner({
        id: row.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        service: data.service,
        about: data.about,
        attachmentName,
        attachmentUrl,
      });
      if (emailed) {
        await supabaseAdmin
          .from("contact_submissions")
          .update({ emailed_at: new Date().toISOString() })
          .eq("id", row.id);
      }
    } catch (err) {
      console.error("[brief] email notification failed", err);
    }

    return { ok: true, id: row.id, emailed };
  });
