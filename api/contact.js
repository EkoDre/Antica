import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, projectType, message } = req.body || {}

  if (!name || !email || !projectType) {
    return res.status(400).json({ error: 'Please fill in all required fields.' })
  }

  const apiKey = process.env.MAILERSEND_API_KEY
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    console.error('MAILERSEND_API_KEY is missing or empty in Vercel environment variables.')
    return res.status(503).json({
      error:
        'Email service is not configured. Please try again later or email us directly at info@anticavenetianplaster.com.',
    })
  }

  try {
    const mailersend = new MailerSend({ apiKey: apiKey.trim() })

    const sentFrom = new Sender('info@anticavenetianplaster.com', 'Antica Website')

    const recipients = [
      new Recipient('info@anticavenetianplaster.com', 'Antica Venetian Plaster'),
    ]

    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    })

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Recipient(email, name))
      .setSubject(`New Lead: ${name} — ${projectType}`)
      .setHtml(
        `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f8f6f1;font-family:'Georgia','Times New Roman',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f6f1;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:600px">

          <tr>
            <td style="background-color:#2c2c2c;padding:28px 40px;text-align:center">
              <h1 style="margin:0;font-size:22px;font-weight:400;letter-spacing:6px;color:#af944d;font-family:'Georgia','Times New Roman',serif">
                ANTICA
              </h1>
              <p style="margin:4px 0 0;font-size:10px;letter-spacing:4px;color:#d4c8a8;font-family:sans-serif">
                VENETIAN PLASTER
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 44px 16px">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fefdfb;border:1px solid #efe9dc;border-radius:4px">
                <tr>
                  <td style="padding:20px 28px;text-align:center">
                    <p style="margin:0 0 2px;font-size:10px;letter-spacing:3px;color:#af944d;font-family:sans-serif;text-transform:uppercase">New Consultation Lead</p>
                    <p style="margin:0;font-size:12px;color:#999;font-family:sans-serif">${submittedAt}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 44px 0">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0ede6">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#af944d;font-family:sans-serif;text-transform:uppercase">Client Name</p>
                    <p style="margin:0;font-size:16px;color:#2c2c2c;font-weight:600">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0ede6">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#af944d;font-family:sans-serif;text-transform:uppercase">Email</p>
                    <p style="margin:0;font-size:15px">
                      <a href="mailto:${email}" style="color:#2c2c2c;text-decoration:none">${email}</a>
                    </p>
                  </td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0ede6">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#af944d;font-family:sans-serif;text-transform:uppercase">Phone</p>
                    <p style="margin:0;font-size:15px"><a href="tel:${phone.replace(/\s/g, '')}" style="color:#2c2c2c;text-decoration:none">${phone}</a></p>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0ede6">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#af944d;font-family:sans-serif;text-transform:uppercase">Requested Finish</p>
                    <p style="margin:0;font-size:15px;color:#2c2c2c;font-weight:600">${projectType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#af944d;font-family:sans-serif;text-transform:uppercase">Message</p>
                    <p style="margin:0;font-size:14px;color:#555;line-height:1.7">${message ? message.replace(/\n/g, '<br>') : '<em style="color:#bbb">No message provided</em>'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 44px 36px;text-align:center">
              <a href="mailto:${email}?subject=Re:%20Your%20Antica%20Inquiry%20–%20${encodeURIComponent(projectType)}&body=Hi%20${encodeURIComponent(name.split(' ')[0])},%0A%0AThank%20you%20for%20your%20interest%20in%20Antica%20Venetian%20Plaster.%0A%0A"
                style="display:inline-block;padding:14px 36px;background-color:#2c2c2c;color:#f8f6f1;font-size:11px;letter-spacing:3px;text-decoration:none;font-family:sans-serif;text-transform:uppercase">
                Reply to ${name.split(' ')[0]}
              </a>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #eee;padding:20px 44px;text-align:center">
              <p style="margin:0;font-size:11px;color:#ccc;font-family:sans-serif">
                This lead was submitted via anticavenetianplaster.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      )
      .setText(
        `NEW CONSULTATION LEAD\n${submittedAt}\n${'—'.repeat(40)}\n\nClient: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}Finish: ${projectType}\n\nMessage:\n${message || '(No message provided)'}\n\n${'—'.repeat(40)}\nSubmitted via anticavenetianplaster.com`
      )

    await mailersend.email.send(emailParams)
    console.log('Inquiry email sent to info@anticavenetianplaster.com for lead:', name, projectType)

    const confirmationFrom = new Sender(
      'info@anticavenetianplaster.com',
      'Antica Venetian Plaster'
    )

    const firstName = name.split(' ')[0]

    const confirmationParams = new EmailParams()
      .setFrom(confirmationFrom)
      .setTo([new Recipient(email, name)])
      .setSubject('Thank You for Your Inquiry — Antica Venetian Plaster')
      .setHtml(
        `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f8f6f1;font-family:'Georgia','Times New Roman',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f6f1;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:600px">

          <tr>
            <td style="background-color:#2c2c2c;padding:32px 40px;text-align:center">
              <h1 style="margin:0;font-size:22px;font-weight:400;letter-spacing:6px;color:#af944d;font-family:'Georgia','Times New Roman',serif">
                ANTICA
              </h1>
              <p style="margin:4px 0 0;font-size:10px;letter-spacing:4px;color:#d4c8a8;font-family:sans-serif">
                VENETIAN PLASTER
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:48px 44px 20px">
              <p style="margin:0 0 24px;font-size:16px;color:#2c2c2c;line-height:1.7">
                Dear ${firstName},
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.8">
                Thank you for reaching out to Antica Venetian Plaster. We have received your inquiry regarding <strong style="color:#2c2c2c">${projectType}</strong> and are delighted by your interest in our artisan finishes.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.8">
                Every surface we touch is a collaboration between vision and craft. A member of our team will review the details of your project and be in touch within <strong style="color:#2c2c2c">48 hours</strong> to discuss how we can bring your space to life.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 44px 36px">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f4;border-left:3px solid #af944d">
                <tr>
                  <td style="padding:20px 24px">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:3px;color:#af944d;font-family:sans-serif">YOUR INQUIRY</p>
                    <p style="margin:6px 0 2px;font-size:13px;color:#888;font-family:sans-serif">Finish:</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#2c2c2c">${projectType}</p>
                    ${phone ? `<p style="margin:6px 0 2px;font-size:13px;color:#888;font-family:sans-serif">Phone:</p><p style="margin:0 0 8px;font-size:14px;color:#2c2c2c">${phone}</p>` : ''}
                    ${message ? `<p style="margin:6px 0 2px;font-size:13px;color:#888;font-family:sans-serif">Message:</p><p style="margin:0;font-size:14px;color:#2c2c2c;line-height:1.6">${message.replace(/\n/g, '<br>')}</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 44px 40px">
              <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.8">
                In the meantime, feel free to explore our portfolio at
                <a href="https://anticavenetianplaster.com/portfolio" style="color:#af944d;text-decoration:none">anticavenetianplaster.com</a>
                for inspiration.
              </p>
              <p style="margin:0;font-size:15px;color:#555;line-height:1.8">
                With warm regards,
              </p>
              <p style="margin:4px 0 0;font-size:16px;color:#2c2c2c;font-weight:600">
                The Antica Team
              </p>
            </td>
          </tr>

          <tr>
            <td style="border-top:1px solid #eee;padding:28px 44px;text-align:center">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#af944d;font-family:sans-serif">ANTICA VENETIAN PLASTER</p>
              <p style="margin:0 0 4px;font-size:12px;color:#999;font-family:sans-serif">470 Nepperhan Avenue, Ste 220, Yonkers, NY 10701</p>
              <p style="margin:0 0 4px;font-size:12px;color:#999;font-family:sans-serif">(914) 886-5730</p>
              <p style="margin:0;font-size:12px;font-family:sans-serif">
                <a href="mailto:info@anticavenetianplaster.com" style="color:#af944d;text-decoration:none">info@anticavenetianplaster.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      )
      .setText(
        `Dear ${firstName},\n\nThank you for reaching out to Antica Venetian Plaster. We have received your inquiry regarding ${projectType} and are delighted by your interest in our artisan finishes.\n\nA member of our team will review the details of your project and be in touch within 48 hours.\n\nYour Inquiry:\nFinish: ${projectType}\n${phone ? `Phone: ${phone}\n` : ''}${message ? `Message: ${message}\n` : ''}\nExplore our portfolio: https://anticavenetianplaster.com/portfolio\n\nWith warm regards,\nThe Antica Team\n\n—\nAntica Venetian Plaster\n470 Nepperhan Avenue, Ste 220, Yonkers, NY 10701\n(914) 886-5730\ninfo@anticavenetianplaster.com`
      )

    await mailersend.email.send(confirmationParams).catch((err) => {
      console.error('Confirmation email failed:', err)
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    const status = err?.body?.statusCode ?? err?.statusCode ?? err?.response?.status
    const msg = err?.body?.message ?? err?.message ?? ''
    console.error('MailerSend error:', status, msg, err)

    if (status === 401) {
      return res.status(503).json({
        error:
          'Email service configuration error. Please try again later or email us at info@anticavenetianplaster.com.',
      })
    }
    if (status === 403 || status === 422) {
      return res.status(503).json({
        error:
          'Email service is not fully set up yet. Please email us directly at info@anticavenetianplaster.com.',
      })
    }

    return res.status(500).json({
      error:
        'Failed to send your inquiry. Please try again or email us directly at info@anticavenetianplaster.com.',
    })
  }
}
