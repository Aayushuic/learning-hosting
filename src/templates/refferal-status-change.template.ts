export const getReferralStatusChangeTemplate = (
  userName: string,
  previousStatus: string,
  newStatus: string,
  points?: number
) => {
  const subject = 'Referral Status Change';
  let html = `
      <p>User, ${userName},</p>
      <p>Referral status has changed from <strong>${previousStatus}</strong> to <strong>${newStatus}</strong>.</p>
    `;

  if (points !== undefined) {
    html += `
        <p>Points credited: <strong>${points}</strong></p>
      `;
  }

  return { subject, html };
};
