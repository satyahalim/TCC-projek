import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


async function getUser(req,res) {
    try {
        const result = await User.findAll()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    } 
}

async function getUserById(req,res) {
    try {
        const result = await User.findOne({
            where:{id: req.params.id}})
        if(!result){
            const error = new Error("Akun tidak ditemukan")
            error.statusCode = 400;
            throw error
        }    
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    } 
}

async function createUser(req,res) {
    try {
        const {name,email,pass,role} = req.body;
        const enkrip = await bcrypt.hash(pass,5);

        if(!name || !email || !pass || !role){
            const msg = "this cant be empty";
            const error = new Error(msg)
            error.statusCode = 401;
            throw error
        }

        await User.create({
            name,
            email, 
            pass : enkrip,
            role
        })

        res.status(201).json({msg: "user registered"})
    } catch (error) {
        console.log(error.message)
    } 
}

async function deleteUser(req,res) {
    try {
       await User.destroy({
        where:{
            id:req.params.id
        }
       })
       res.status(200).json({msg:"user deleted"}) 
    } catch (error) {
        console.log(error.message)
    }  
}

async function updateUser(req,res) {
    try {
       await User.update({
        where:{
            id:req.params.id
        }
       })
       res.status(200).json({msg:"user updated"}) 
    } catch (error) {
        console.log(error.message)
    }  
}

async function login(req,res) {
    try {
        const{email,pass} = req.body
        const user = await User.findOne({
            where:{
                email : email
            }
        })

        if(result){
            const userPlain = user.toJSON()
            console.log(userPlain);
            const {pass:_, refresh_token:__, ...safeUserData} = userPlain
            const dekrip = await bcrypt.compare(pass, user.pass)
            if (dekrip){
                const accessToken = jwt.sign(
                    safeUserData,
                    process.env.ACCESS_TOKEN_SECRET,{
                        expiresIn: "30s",
                    }
                )
                const refreshToken = jwt.sign(
                    safeUserData,
                    process.env.REFRESH_TOKEN_SECRET,{
                        expiresIn: "1d",
                    }
                )
                await User.update(
                    {refresh_token:refreshToken},
                {
                    where:{
                        id : user.id,
                    }
                  }
                )

            res.cookie("refreshToken", refreshToken,{
                httpOnly: false, // Ngatur cross-site scripting, untuk penggunaan asli aktifkan karena bisa nyegah serangan fetch data dari website "document.cookies"
                sameSite: "none", // Ngatur domain yg request misal kalo strict cuman bisa akses ke link dari dan menuju domain yg sama, lax itu bisa dari domain lain tapi cuman bisa get
                maxAge: 24 * 60 * 60 * 1000, // Ngatur lamanya token disimpan di cookie (dalam satuan ms)
                secure: true, // Ini ngirim cookies cuman bisa dari https, kenapa? nyegah skema MITM di jaringan publik, tapi pas development di false in aja
             })

            res.status(200).json({
                status: "success",
                safeUserData,
                accessToken
            }) 
            } else{
                error : new Error("pass or email salah")
                error.statusCode = 400;
                throw error
            }

        }
    } catch (error) {
        res.status(error)
        
    }
    
}
// Fungsi logout
async function logout(req, res) {
  // mengecek refresh token sama gak sama di database
  const refreshToken = req.cookies.refreshToken;

  // Kalo ga sama atau ga ada kirim status code 204
  if (!refreshToken) return res.sendStatus(204);

  // Kalau sama, cari user berdasarkan refresh token tadi
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  // Kalau user gaada, kirim status code 204
  if (!user.refresh_token) return res.sendStatus(204);

  // Kalau user ketemu, ambil user id
  const userId = user.id;

  // Hapus refresh token dari DB berdasarkan user id tadi
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  // Ngehapus cookies yg tersimpan
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
}

export{getUser,getUserById,createUser,updateUser,deleteUser,login,logout}