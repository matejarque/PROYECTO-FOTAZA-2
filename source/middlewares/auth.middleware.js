export const esUsuarioRegistrado = (req, res, next) => {
    //verifica si el usuario existe y esta logueado, si esta lo deja continuar, si no, le salta un error
    if (req.session && req.session.usuarioLogueado) {
        return next();
    } else {
        res.status(401).render('index', {error: 'Debes iniciar sesion para poder realizar esta accion',publicaciones: []});
    }
    
    return res.redirect("/")
};