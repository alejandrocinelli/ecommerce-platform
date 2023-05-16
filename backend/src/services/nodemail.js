import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const trasporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.MAIL_ADMIN,
      pass: process.env.TPWD,
    },
  });
    
  const sendMail = async (usuario,mail ) => {

    const mailOptions = {
    from: "Server Node",
    to: process.env.MAIL_ADMIN,
    subject: "Nuevo Usuario Registrado",
    html: `<h3 style="color: blue;">usuario: ${usuario}</h3>
            <h3 style="color: blue;">mail: ${mail}</h3>
            `,  };
  try {
    const info = await trasporter.sendMail(mailOptions);
  
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

async function sendMailCartPurchased(sendInfoFront) {
  try {
    const productsTable = sendInfoFront.order.products.map(product => {
      return `<tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
              </tr>`;
    }).join('');

    const mailOptCartPurchased = {
      from: "Node Service",
      to: process.env.MAIL_ADMIN,
      subject: `Nuevo pedido del usuario : ${sendInfoFront.user.username} de ${sendInfoFront.user.email} `,
      html: `<h3 style="color: blue;">Nuevo carrito comprado:</h3>
      <table class="table table-striped>
        <thead class="table-secondary>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          ${productsTable}
        </tbody>
      </table>
      <h3>El numero de orden es: ${sendInfoFront.order.orderNumber} </h3>
      `,
    };
    const info = await trasporter.sendMail(mailOptCartPurchased);

    console.log(info);
  } catch (err) {
    throw new Error(err);
  }
}

export const mailService = {
  sendMail,
  sendMailCartPurchased,
};