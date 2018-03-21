import { PaidUser,Coupon,Payment,User } from './connectors';
var passwordHash = require('password-hash');


var stripe = require("stripe")("your_key_here");

const resolvers = {
  Query: {
    Login(_, args) {
      var ExistingUser = PaidUser.find({where:{email: args.email}})
      .then(User => {
        if (passwordHash.verify(args.password,User.password)){
        return User;
        }else{
        return null;
        }
      });
      return ExistingUser;
    },
    paidUser(_, args) {
      return PaidUser.find({ where: { id_user: args.id_user } })
      .then((user) => {return user;})
      .catch(err => {return err;});
    },
    CreatepaidUser(_, args) {
      return PaidUser.create({
        name      : args.name,
        lastname  : args.lastname,
        email     : args.email,
        password  : passwordHash.generate(args.password)
      });
    },
    CreateUser(_, args){
      return User.findOrCreate({where: {email: args.email }, defaults: {name: args.name , lastname  : args.lastname}})
      .spread((user, created) => {
        if (created===false) {
          return user.get({
            plain: true
          }) 
        }
      });
    },
    CreateCoupon(_,args){
      return Coupon.create({
        name        :  args.name,
        descrip     :  args.descrip,
        price       :  args.price,
        id_paiduser :  args.id_paiduser
      });
    },
    PayCoupon(_,args){
       var user = User.findOrCreate({where: {email: args.email }, defaults: {name: args.name , lastname  : args.lastname}})
      .spread((user, created) => {
          return user.get({
            plain: true
          }).id_user; 
      });
      var coupon = Coupon.find({where:{id_coupon: args.id_coupon}}).then(coupons => {return coupons;});
      var amount = coupon.price;
      var id_paiduser = coupon.id_paiduser;
      stripe.charges.create({
        amount: amount,
        currency: "usd",
        description: coupon.name,
        source: args.token,
      }, function(err, charge) {
        return Payment.create({
          amount      :   amount,
          id_user     :   user,
          id_paiduser :   id_paiduser,
          status      :   "paid:"+ charge.paid,
          id_coupon   :   args.id_coupon
        });
      });
     
    },
    getCoupon(_,args){
      var coupon = Coupon.find({where:{id_coupon: args.id_coupon}})
      .then(coupons => {
        return coupons;
      });
      return coupon;
    }
  },//End Query
  PaidUser: {
    coupon(paidUser) {
      return paidUser.getCoupons();
    },
  },
  Coupon: {
    paidUser(coupon) {
      return coupon.getPaidUsers();
    },
  },
};

export default resolvers;