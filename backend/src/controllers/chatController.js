import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const chatUsers = (req, res) => {

   const user = req.user.username;
   const email = req.user.email
   
   
 res.render("chat", {user , email});
 //res.sendFile(join(__dirname, "../../views/chat2.html"));
};

export const configureChatController = {
  chatUsers 
}