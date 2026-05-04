export const esUsuarioRegistrado = (req, res, next) => {
    if (req.session && req.session.usuarioLogueado) {
        return next();
    } 

    return res.status(401).render('index', {
        error: 'Debes iniciar sesion para poder realizar esta accion',
        publicaciones: []
    });
};
