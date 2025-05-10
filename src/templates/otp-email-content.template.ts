export interface OTPEmailParams {
  title?: string;
  otpCode: string;
  siteUrl: string;
}

export function getOTPEmailContent(params: OTPEmailParams): string {
  const {
    title = 'HappyDot.sg: One-time PIN Code',
    otpCode,
    siteUrl = 'https://www.happydot.sg',
  } = params;

  return `
      <table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' id='backgroundTable' st-sortable='header'>
        <tbody>
          <tr>
            <td>
              <table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='devicewidth'>
                <tbody>
                  <tr>
                    <td width='100%'>
                      <table width='600' cellpadding='0' cellspacing='0' border='0' align='left' class='devicewidth'>
                        <tbody>
                          <tr>
                            <td height='20' style='font-size:1px; line-height:1px; mso-line-height-rule: exactly;'>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <table width='140' align='left' border='0' cellpadding='0' cellspacing='0' class='devicewidth'>
                                <tbody>
                                  <tr>
                                    <td width='169' height='45' align='left'>
                                      <div class='imgpop'>
                                        <img src='http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/e21b2643-3426-4f12-a097-8e4352cf3215/512x253.png' alt='HappyDot.sg' border='0' width='169' style='display:block; border:none; outline:none; text-decoration:none;'>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td height='20' style='font-size:1px; line-height:1px; mso-line-height-rule: exactly;'>&nbsp;</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  
      <table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' id='backgroundTable' st-sortable='seperator'>
        <tbody>
          <tr>
            <td>
              <table width='600' align='center' cellspacing='0' cellpadding='0' border='0' class='devicewidth'>
                <tbody>
                  <tr>
                    <td align='center' height='20' style='font-size:1px; line-height:1px;'>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  
      <table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' id='backgroundTable' st-sortable='full-text'>
        <tbody>
          <tr>
            <td>
              <table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='devicewidth'>
                <tbody>
                  <tr>
                    <td width='100%'>
                      <table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='devicewidth'>
                        <tbody>
                          <tr>
                            <td height='20' style='font-size:1px; line-height:1px; mso-line-height-rule: exactly;'>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              <table width='560' align='center' cellpadding='0' cellspacing='0' border='0' class='devicewidthinner'>
                                <tbody>
                                  <tr>
                                    <td style='font-size: 18px; color: #333333; text-align:center; line-height: 30px;' st-title='fulltext-heading'>
                                      ${title}<br />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align='center' height='15' style='font-size:1px; line-height:1px;'>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width='550' align='center' height='1' bgcolor='#d1d1d1' style='font-size:1px; line-height:1px;'>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td style='font-size: 14px; color: #666666; text-align:left; line-height: 30px;' st-content='fulltext-content'>
                                      Greetings from HappyDot.sg!<br />
                                      This is your one-time PIN code which will expire in 30
                                      minutes. <br /><br />
                                      <center><span style="background-color: #CB333B; padding: 10px; font-size: 16px; line-height: 24px; color:#fff; text-align: center; width:210px;"><b>${otpCode}</b></span></center>
                                      <br />
  
                                      Please use this code for verification, before we can
                                      proceed with the request. Always remember, never share this OTP with anyone.<br />
                                      <br />
                                      If you did not request to change your password or if you
                                      have any other enquiries, please contact us at <a href='mailto:enquiry@happydot.sg?subject=Enquiry'>enquiry@happydot.sg</a>.<br /><br />Thank
                                      You!
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width='100%' height='20' style='font-size:1px; line-height:1px; mso-line-height-rule: exactly;'>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td style='font-size: 14px; color: #666666; text-align:left; line-height: 30px;' st-content='fulltext-content'>
                                      HappyThoughts, <br />HappyDot.sg Team
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  
      <table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' id='backgroundTable' st-sortable='seperator'>
        <tbody>
          <tr>
            <td>
              <table width='600' align='center' cellspacing='0' cellpadding='0' border='0' class='devicewidth'>
                <tbody>
                  <tr>
                    <td align='center' height='15' style='font-size:1px; line-height:1px;'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td width='550' align='center' height='1' bgcolor='#d1d1d1' style='font-size:1px; line-height:1px;'>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  
      <table width='100%' bgcolor='#ffffff' cellpadding='0' cellspacing='0' border='0' id='backgroundTable' st-sortable='postfooter'>
        <tbody>
          <tr>
            <td>
              <table width='600' cellpadding='0' cellspacing='0' border='0' align='center' class='devicewidth'>
                <tbody>
                  <tr>
                    <td width='100%' align='left' valign='middle' style='font-size: 12px;color: #666666; line-height:20px;' st-content='postfooter'>
                      <p style="font-family: Helvetica, sans-serif;font-weight: normal; text-align: left; line-height: 20px;font-size: 12px;color: #000;margin: 0px;"><i>Your Opinion Matters.</i></p>
                      <p style="margin-top: 4px;">
                        <a href="https://www.facebook.com/HappyDot.sg/" style="text-decoration: none;">
                          <img style="display: inline-block; height: 30px; width: 30px;" src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/b004d50a-d105-44e6-85e0-679cf3bed3e8/256x256.png" alt="icon" width="30" height="30" />
                        </a>
                        &nbsp;
                        <a href="https://www.instagram.com/happydotsg/" style="text-decoration: none;">
                          <img style="display: inline-block; height: 30px; width: 30px;" src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/a909e060-8538-45e3-a2de-ce23d3de0e14/768x768.png" alt="icon" width="30" height="30" />
                        </a>
                        &nbsp;
                        <a href="https://t.me/happydotsgchannel/" style="text-decoration: none;">
                          <img style="display: inline-block; height: 30px; width: 30px;" src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/1865b699-3150-4a63-8ca0-2e61adaf4da7/2048x2048.png" alt="icon" width="30" height="30" />
                        </a>
                      </p>
                      <p style="font-family: Helvetica, sans-serif;font-weight: normal; text-align: left; line-height: 20px;font-size: 12px;color: #000;margin: 0px;font-style: italic;">
                        Copyright © 2024 HappyDot.sg. All rights <br />
                        Please do not reply to this system generated message.<br />
                        Feedback? Enquiries? Updates? Contact us <a href="${siteUrl}/contact-us/" style="color: #007C89;">here</a>.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;
}
