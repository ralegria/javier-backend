import {
  makeExecutableSchema,
} from 'graphql-tools';
import resolvers from './resolvers';


const typeDefs = `
type PaidUser {
  id_user:    String
  name:       String
  lastname:   String
  email:      String
  coupon:     [Coupon]
}
type User {
  id_user:    String
  name:       String
  lastname:   String
  email:      String
}
type Coupon {
  id_coupon:  String
  name:       String
  descrip:    String
  price:      Int
  id_paiduser:String
  paidUser:   [PaidUser]
}
type Payment{
  id:         String
  comments:   String
  amount:     Int
  id_coupon:  String
  id_user:    String
  Token:      String
}
type Query {
  Login(email: String, password: String): PaidUser
  paidUser(id_user: String): PaidUser
  CreatepaidUser(name: String, lastname: String, email: String , password: String):PaidUser
  CreateUser(name: String, lastname: String, email: String):User
  CreateCoupon(name: String, descrip: String, price:Int, id_paiduser:String):Coupon
  PayCoupon(name: String, lastname: String, email: String,Token: String , id_coupon: String):Payment
  getCoupon(id_coupon: String):Coupon
}
`;

const schema = makeExecutableSchema({ typeDefs });

export default makeExecutableSchema({ typeDefs, resolvers });