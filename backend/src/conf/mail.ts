import nodemailer from 'nodemailer';








const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'tech_matcha@hotmail.com',
        pass: '********'
    },
}); 



export default transporter;