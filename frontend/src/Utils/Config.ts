import UrlDomainModel from "../Models/UrlDomainModel"

const urlDomain: UrlDomainModel = new UrlDomainModel('http://localhost:3002') 

export interface IConfig {
    baseURL:string
    socialCustomerEndpoint: string
}

const environments:any = { 
    development: {
      baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api',
      socialCustomerEndpoint:'/socialCustomer',
    },
    test: {
        baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api',
        socialCustomerEndpoint:'/socialCustomer',
    },
    production: {
        baseURL: `${urlDomain.protocol}`+`${urlDomain.domain}`+'api',
        socialCustomerEndpoint:'/socialCustomer',
    }
  }
  
  const currentEnvironment = process.env.NODE_ENV || 'development'
  
  const config:IConfig = {
    ...environments[currentEnvironment],
  }
  
  export default config;
