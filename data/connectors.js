/**
 * @author [Moliendas]
 * @email [moliendas@estatal.com]
 * @create date 2017-09-26 10:55:44
 * @modify date 2017-12-05 06:37:50
 * @desc [connection and models to the datababes]
*/

import Sequelize from 'sequelize';
import _ from 'lodash';
import fetch from 'node-fetch';

//Database access
const db = new Sequelize('DATABASE_NAME','USER', 'PASSWORD', {
    host: 'Your_SQL_DOMAIN',
    dialect: 'mysql',
});

const UsuarioModel = db.define('usuario', {
    id     :   {type:          Sequelize.UUID,
                    defaultValue:   Sequelize.UUIDV1, 
                    primaryKey: true},
    nombre        :   {type:  Sequelize.STRING },
    apellido    :   {type:  Sequelize.STRING },
    correo       :   {type:  Sequelize.STRING},
    contra    :   {type:  Sequelize.STRING},
});

const CuponModel = db.define('cupon', {
    id   :   {type:          Sequelize.UUID,
                    defaultValue:   Sequelize.UUIDV1,  
                    primaryKey:     true},
    idusuario :   {type:  Sequelize.STRING,
                            foreignKey: true},
    nombre        :   {type:  Sequelize.STRING },
    precio       :   {type:  Sequelize.INTEGER},
    detalle     :   {type:  Sequelize.STRING },
});

const UsuariosModel = db.define('usuarios', {
    id_usuario     :   {type:          Sequelize.UUID,
                    defaultValue:   Sequelize.UUIDV1, 
                    primaryKey: true},
    nombre        :   {type:  Sequelize.STRING },
    apellido    :   {type:  Sequelize.STRING },
    correo       :   {type:  Sequelize.STRING},
    contra    :   {type:  Sequelize.STRING},
});

  //relations PaidUser-Coupons a user can have many coupons
  UsuarioModel.hasMany(CuponModel,{'foreignKey':'idusuario'});
  CouponModel.belongsTo(PaidUserModel,{'foreignKey':'id_paiduser'});
  
const usario  = db.models.usario;
const cupon    = db.models.cupon;
const usarios      = db.models.usarios;


export { usario,cupon,usarios};