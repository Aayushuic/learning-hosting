export const getReferAFriendEmailContent = (
  friendName: string,
  senderName: string,
  referralLink: string
): string => {
  const emailMainImage =
    '<img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/206c053f-f66a-43b9-b3cd-c1c8b67b67ea/1175x2625.png" alt="why-join-now" width="600" height="100%" />';

  return `
<table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background: #ffffff;">
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
          <td>
            <a href="#" style="display: inline-block;">
              <img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/e21b2643-3426-4f12-a097-8e4352cf3215/512x253.png" alt="Fireclaw" width="145" height="70" />
            </a>
          </td>
        </tr>
        <tr>
          <td height="20"></td>
        </tr>
        <tr>
          <td width="100%" height="2" bgcolor="#F83333"></td>
        </tr>
        <tr>
          <td height="20"></td>
        </tr>
        <tr>
          <td>
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">Hey <b>${friendName},</b></p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">
              ${senderName} has exclusively invited you to join them at HappyDot.sg!
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">
              HappyDot.sg is an online survey community for Singaporeans. It is a channel for Singapore residents to voice their opinions on issues that impact Singapore.
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">
              Join ${senderName} as a HappyDotter now and start sharing your views online together!
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">
              <a href="${referralLink}" style="display: inline-block;">Click here to join now</a>
            </p>
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0; font-style: italic;">
              If you are unable to click above, copy paste this link into your browser:
              <a href="${referralLink}" style="color: #007C89;">${referralLink}</a>
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">
              Sign up through your unique referral link to connect with your friend on HappyDot.sg so that they can earn referral points too! Got questions? Reach out to us at enquiry@happydot.sg and we’ll be happy to help.
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">Looking forward to having you with us.</p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 13px; color: #000; margin: 0;">HappyThoughts,<br />HappyDot.sg Team</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background: #ffffff;">
  <tr>
    <td>
      <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
        <tr>
          <td width="100%" height="2" bgcolor="#E0DDDD"></td>
        </tr>
        <tr>
          <td height="20"></td>
        </tr>
        <tr>
          <td>
            <p style="font-family: Helvetica, sans-serif; font-size: 12px; color: #000; margin: 0; font-style: italic;">
              Your opinion matters.
            </p>
            <p style="margin: 0;">
              <a href="https://www.facebook.com/HappyDot.sg/" target="_blank">
                <img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/1d97a707-eece-4bcd-bcd4-d02a2aec38db/21x21.png" alt="icon" width="21" height="21" />
              </a>
              &nbsp;
              <a href="https://www.instagram.com/happydotsg/" target="_blank">
                <img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/131a471f-b9cb-4b9d-808f-e200ef09784e/21x21.png" alt="icon" width="21" height="21" />
              </a>
              &nbsp;
              <a href="https://t.me/happydotsgchannel/" target="_blank">
                <img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/1d97a707-eece-4bcd-bcd4-d02a2aec38db/21x21.png" alt="icon" width="21" height="21" />
              </a>
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 12px; color: #000; margin: 0; font-style: italic;">
              Copyright © 2024 HappyDot.sg. All rights reserved.<br />
              Please do not reply to this system-generated message. We are not able to receive replies to this email.
            </p>
            <br />
            <p style="font-family: Helvetica, sans-serif; font-size: 12px; color: #000; margin: 0; font-style: italic;">
              Feedback? Enquiries? Updates? Contact us <a href="/contact-us/" style="color: #1188E6;">here</a>. Tell your friends about HappyDot.sg and get HappyPoints when they join!
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
};
