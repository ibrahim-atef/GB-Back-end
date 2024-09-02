function createMsg(userId, senderEmail, subject, textBody, htmlContent) {
    return {
        to: userId, // Recipient
        from: senderEmail, // Sender email
        subject: subject, // Email subject
        text: textBody, // Plain text body
        html: htmlContent // HTML content
    };
}

module.exports = { createMsg };