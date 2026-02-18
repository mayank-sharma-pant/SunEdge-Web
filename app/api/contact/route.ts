import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure transporter
        // Priority: Environment variables -> Fallback (Log only)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true', // true for port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Check if configuration exists to actually send
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log('⚠️ SMTP Credentials not found. Mocking email send.');
            console.log('To: sales@sunedgesolution.com');
            console.log(`From: ${name} <${email}>`);
            console.log(`Message: ${message}`);

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, message: 'Inquiry received (Mock Mode)' });
        }

        // Send email
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`,
            replyTo: email,
            to: 'sales@sunedgesolution.com',
            subject: `New Inquiry from SunEdge Web: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send inquiry' },
            { status: 500 }
        );
    }
}
