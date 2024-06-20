import conf from '../conf/conf.js';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
        this.account = new Account(this.client);
        this.bucket = new Storage(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
         

            if(!userAccount){
                console.log("Account creation failed");
                return null;
            }

      const login = await this.login({ email, password });

      if (!login) {
        console.log("Login failed");
        return null;
      }

      const newUser = await this.saveUserToDB({
        accountId: userAccount.$id,
        name: userAccount.name,

        email: userAccount.email,
             });
      if (!newUser) {
        console.log("Failed to save user data to the database");
        return null;
      }

      return newUser;

        } catch (error) {
            throw error;
        }
    }

    async saveUserToDB({
        accountId,
        name,
        email,
        }) {
        try {
          const users = await this.getUserInfo(accountId);
          if (users) {
            return users;
          } else {
            // If the user doesn't exist, create a new user
            const userDataSaved = await this.databases.createDocument(
              conf.appwriteDatabaseId,
              conf.appwriteUserCollectionId,
              ID.unique(),
              {
                accountId,
                name,
                email,
                }
            );
            return userDataSaved;
          }
        } catch (error) {
          console.log("Appwrite service :: saveUserToDB :: error", error);
        }
      }

    async login({email, password}) {
        try {
          return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("there is an error :",error)
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const currentAccount = await this.account.getSession("current")

            if (!currentAccount) throw Error;

            const currentUser = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("accountId", currentAccount.userId)]
              );
              if (!currentUser) throw Error;

              return currentUser.documents[0];

        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async getUserInfo(userId) {
        try {
          const userInfo = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
    
            [Query.equal("accountId", userId)]
          );
          return userInfo.documents[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


