// Sends the brief notification to the studio inbox.
// Email sending activates once the project's sender domain is configured;
// until then submissions are still stored and the upload link is saved.
export const OWNER_INBOX = "ykhandelwal670@gmail.com";

export interface BriefNotification {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  service: string;
  about: string;
  attachmentName: string | null;
  attachmentUrl: string | null;
}

export async function notifyBriefOwner(brief: BriefNotification): Promise<boolean> {
  console.log("[brief] new submission", {
    id: brief.id,
    to: OWNER_INBOX,
    hasAttachment: Boolean(brief.attachmentUrl),
  });
  return false;
}
