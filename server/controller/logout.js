async function logout(req,res){
    try {
        const cookieOptions = {
            http: true,
            secure: true,
          };
        return res.cookies('token','',cookieOptions).status(200).json({
            message: 'Session out',
            success: true,
          });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
          });
    }
}

module.exports = logout