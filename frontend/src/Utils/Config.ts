import UrlDomainModel from "../Models/UrlDomainModel";

const urlDomain: UrlDomainModel = new UrlDomainModel("http://localhost:3002");

export interface IConfig {
  baseURL: string;
  socialCustomerEndpoint: string;
  volunteerProjectsEndPoint: string;
  projectCustomerEndPoint: string;
}

type envType = { development: IConfig; test: IConfig; production: IConfig };
const environments: envType = {
  development: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}` ,
    socialCustomerEndpoint: "api/socialCustomer",
    volunteerProjectsEndPoint: "api/volunteer-projects",
    projectCustomerEndPoint: "api/projects-customers",
  },
  test: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}` ,
    socialCustomerEndpoint: "/socialCustomer",
    volunteerProjectsEndPoint: "/volunteer-projects",
    projectCustomerEndPoint: "/projects-customers",
  },
  production: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}` ,
    socialCustomerEndpoint: "/socialCustomer",
    volunteerProjectsEndPoint: "/volunteer-projects",
    projectCustomerEndPoint: "/projects-customers",
  },
};

const currentEnvironment = process.env.NODE_ENV || "development";

const config: IConfig = {
  ...environments[currentEnvironment],
};

export default config;
