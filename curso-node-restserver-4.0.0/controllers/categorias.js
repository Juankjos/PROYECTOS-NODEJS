const { response } = require('express');
const { Categoria } = require('../models');

//Controladores CATEGORIAS

//Se muestran resultados de las categorías por medio de una búsqueda, que empieza desde cero y te muestra máximo 5 registros
const obtenerCategorias = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}

//Obtiene la caregoría por el id, mostrando u obteniendo los datos del usuario y su nombre de categoría
const obtenerCategoria = async(req, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                            .populate('usuario', 'nombre');

    res.json( categoria );

}

//Hace un request de parte del usuario para ingresar el nombre de una categoría, ingresándolas con solo letras mayúsculas
//y validando si una categoría está exactamente escrita a una que se ingrese comparándola en la base de datos, obteniendolo
//por la parte del nombre 
const crearCategoria = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar requiriendo los datos de usuario por medio de su id
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

//Para actualizar los datos dentro de la data y buscándolos por su id, al igual que la creación se modifica y se vuelven a 
//letras mayúsculas, y así mismo lo que sea modificado deberá estar en valor true
const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );

}

//Vuelve las categorías a estado false para borrar el elemento, realmente no se borra para seguir teniendo un registro,
//pero con el false hacemos que no se muestren más en las búsquedas
const borrarCategoria = async(req, res =response ) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( categoriaBorrada );
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}