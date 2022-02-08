import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js'

import { promisify } from "util"

const poolData = {
    UserPoolId: "ca-central-1_N8aMVCfBY",
    ClientId: "p2gcml812kc228mleobagbiqe"
}

const userPool = new CognitoUserPool(poolData)

export async function signUp(username, password, email) {
    const attributeList = [
        new CognitoUserAttribute({ Name: "email", Value: email })
    ]

    const cognitoSignUp = promisify(userPool.signUp).bind(userPool)

    try {
        const result = await cognitoSignUp(username, password, attributeList, null)
        const user = result.user
        return user
    } catch (error) {
        console.log("Error signing up", error)
    }
}

export async function confirmUser(username, code) {
    const userData = {
        Username: username,
        Pool: userPool
    }

    const cognitoUser = new CognitoUser(userData)
    const confirm = promisify(cognitoUser.confirmRegistration).bind(cognitoUser)

    try {
        const result = await confirm(code, false)
        return result
    } catch (error) {
        console.log("Error confirming user", error)
    }
}

export async function login(username, password) {
    return new Promise((resolve, reject) => {
        const authData = {
            Username: username,
            Password: password
        }

        const authDetails = new AuthenticationDetails(authData)

        const userData = {
            Username: username,
            Pool: userPool
        }

        const cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: result => resolve(result),
            onFailure: error => reject(error)
        })
    })

}
export function currentUser() {
    return userPool.getCurrentUser()
}

export function signOut() {
    const user = currentUser()
    user?.signOut()
}

export async function userToken() {
    const user = currentUser()
    if (!user) {
      console.log("User not logged in")
      return 
    }
    const getSession = promisify(user.getSession).bind(user)
    
    try {
      const session = await getSession()
      const jwt = session.getIdToken().getJwtToken()
      return jwt
    } catch (error) {
      console.log("Error getting token", error)
    }
  }
  
