export function getSignupSuccessEmailContent(
  name: string,
  msgType: string,
  emailContentSnippet: string
): string {
  const template = `
      <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background: #ffffff;">
        <tr>
          <td width="20"></td>
          <td>
            <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <tr>
                <td>
                  <a href="#" style="display: inline-block;">
                    <img src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/e21b2643-3426-4f12-a097-8e4352cf3215/512x253.png" alt="HappyDot.sg" width="145" height="70" />
                  </a>
                </td>
              </tr>
              <tr><td height="20"></td></tr>
              <tr><td width="100%" height="2" bgcolor="#F83333"></td></tr>
              <tr><td height="20"></td></tr>
              ${
                msgType === 'eplwa'
                  ? `
                <tr>
                  <td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff">
                    <div style="font-family: inherit; text-align: center">
                      <span style="font-size: 43px">Thank you for signing up, <br> ${name}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff">
                    <div style="font-family: inherit; text-align: center">
                      <span style="font-size: 18px">Welcome to the HappyDot.sg family!&nbsp;</span>
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="font-size: 18px">We're thrilled to have you join us.<br><br></span>
                      <span style="color: #000000; font-size: 18px; font-family: arial, helvetica, sans-serif">
                        Just a few more steps before you can get started on participating in surveys and earning rewards!
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                    <a href="https://www.happydot.sg/login-page/">
                      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" 
                           src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/33380bd4-8c0b-4771-9b0f-0d0cba083dd6/1080x1009.gif" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 30px 30px 30px; line-height:22px; text-align:inherit; background-color:#6e6e6e;" height="100%" valign="top" bgcolor="#6e6e6e">
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #ffffff; font-size: 18px"><strong>Here's what happens next:</strong></span>
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #ffffff; font-size: 18px">
                        Our team will reach out to you to schedule a WhatsApp Video Call to confirm your details.<br><br>
                        You will receive the $25 Weston Corp eGift card via email within 3-5 business day after the WhatsApp Video Call!
                      </span>
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #ffbe00; font-size: 18px"><strong>We look forward to having you onboard!</strong></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff">
                    <div style="font-family: inherit; text-align: center">
                      <span style="font-size: 14px; color: #050505">Didn't sign up for HappyDot.sg using this email?&nbsp;</span>
                      <span style="font-size: 14px; color: #050505">Reach out to our team!</span>
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <a href="https://www.happydot.sg/contact-us/" 
                         style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none;" 
                         target="_blank">Contact Us</a>
                    </div>
                  </td>
                </tr>
              `
                  : msgType === 'ntutouchattack'
                  ? `
                <tr>
							<td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Thank you for signing up, ${name} </span></div>
									<div></div>
								</div>
							</td>
						</tr><br>
						<tr>
							<td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Welcome to the HappyDot.sg family!&nbsp;</span></div>
									<div style="font-family: inherit; text-align: center">
										<span style="font-size: 18px">We’re thrilled to have you join us.<br><br></span>
										<span style="color: #000000; font-size: 18px; font-family: arial, helvetica, sans-serif">Just a few more steps before you can get started on participating in surveys and earning rewards!</span>
									</div>
							</td>
						</tr>
						<tr>
							<td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
								<a href="https://www.happydot.sg/login-page/"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="NaN" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/33380bd4-8c0b-4771-9b0f-0d0cba083dd6/1080x1009.gif"></a>
							</td>
						</tr>
						<tr>
							<td style="padding:30px 30px 30px 30px; line-height:22px; text-align:inherit; background-color:#6e6e6e;" height="100%" valign="top" bgcolor="#6e6e6e" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center">
										<span style="color: #ffffff; font-size: 18px">
											<strong>Here’s what happens next:</strong>
										</span>
									</div>
									<div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">&nbsp;</span></div>
									<div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">
											Our team will reach out to you to schedule a WhatsApp Video Call to confirm your details.<br><br>
											You will receive 500 Welcome Points to redeem your preferred E&#8209;Voucher worth $10 about a week after the WhatsApp Video Call!</span></div>
									<br>
								</div>
								<div style="font-family: inherit; text-align: center">
									<span style="color: #ffbe00; font-size: 18px"><strong>We look forward to having you onboard!</strong></span>
								</div>
							</td>
						</tr>
						<tr>
							<td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #050505">If you did not sign up for HappyDot.sg using this email?&nbsp;</span></div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #050505">Reach out to our team!</span></div>
									<div></div>
									<div style="font-family: inherit; text-align: center">
										<a href="https://www.happydot.sg/contact-us/" style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Contact Us</a>
									</div>
								</div>
							</td>
						</tr>
              `
                  : msgType === 'become-a-happydotter'
                  ? `<tr>
							<td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Thank you for signing up, <br> ${name} </span></div>
									<div></div>
								</div>
							</td>
						</tr><br>
						<tr>
							<td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Welcome to the HappyDot.sg family!&nbsp;</span></div>
								<div style="font-family: inherit; text-align: center">
									<span style="font-size: 18px">We’re thrilled to have you join us.<br><br></span>
									<span style="color: #000000; font-size: 18px; font-family: arial, helvetica, sans-serif">Just a few more steps before you can get started on participating in surveys and earning rewards!</span>
								</div>
							</td>
						</tr>
						<tr>
							<td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
								<a href="https://www.happydot.sg/login-page/"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="NaN" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/1c4cdb267da5545b/16a95668-0e5e-4854-b25f-0b009c44268c/600x561.gif"></a>
							</td>
						</tr>
						<tr>
							<td style="padding:30px 30px 30px 30px; line-height:22px; text-align:inherit; background-color:#6e6e6e;" height="100%" valign="top" bgcolor="#6e6e6e" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center">
										<span style="color: #ffffff; font-size: 18px">
											<strong>Here’s what happens next:</strong>
										</span>
									</div>
									<div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">&nbsp;</span></div>
									<div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">
											Once you select your voucher, our courier will contact you to arrange delivery. Your contact details and address will be shared with the courier for this purpose.
											<br><br>
											Expect to receive a Welcome Email about a week after you get your voucher, officially making you a HappyDotter!</span></div>
									<br>
								</div>
								<div style="font-family: inherit; text-align: center">
									<span style="color: #ffbe00; font-size: 18px"><strong>We look forward to having you on board!</strong></span>
								</div>
							</td>
						</tr>
						<tr>
							<td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
								<div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #050505">Didn’t sign up for HappyDot.sg using this email?&nbsp;</span></div>
									<div style="font-family: inherit; text-align: center"><span style="font-size: 14px; color: #050505">Reach out to our team!</span></div>
									<div></div>
									<div style="font-family: inherit; text-align: center">
										<a href="https://www.happydot.sg/contact-us/" style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">Contact Us</a>
									</div>
								</div>
							</td>
						</tr>`
                  : emailContentSnippet
              }
              <tr><td height="25"></td></tr>
            </table>
          </td>
        </tr>
      </table>
    `;
  return template;
}
