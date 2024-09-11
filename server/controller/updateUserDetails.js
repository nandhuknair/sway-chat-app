async function updateUserDetails(req,res){
    try {
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
          });
    }
}