import UrlDomainModel from "../Models/UrlDomainModel";

const urlDomain: UrlDomainModel = new UrlDomainModel("http://localhost:3002");

export interface IConfig {
  baseURL: string;
  socialCustomerEndpoint: string;
  volunteerProjectsEndPoint: string;
  projectCustomerEndPoint: string;
  citiesEndPoint: string;
}

type envType = { development: IConfig; test: IConfig; production: IConfig };
const environments: envType = {
  development: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}`,
    socialCustomerEndpoint: "api/socialCustomer",
    volunteerProjectsEndPoint: "api/volunteer-projects",
    projectCustomerEndPoint: "api/projects-customers",
    citiesEndPoint: "api/cities",
  },
  test: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}`,
    socialCustomerEndpoint: "/socialCustomer",
    volunteerProjectsEndPoint: "/volunteer-projects",
    projectCustomerEndPoint: "/projects-customers",
    citiesEndPoint: "api/cities",
  },
  production: {
    baseURL: `${urlDomain.protocol}` + `${urlDomain.domain}`,
    socialCustomerEndpoint: "/socialCustomer",
    volunteerProjectsEndPoint: "/volunteer-projects",
    projectCustomerEndPoint: "/projects-customers",
    citiesEndPoint: "api/cities",
  },
};

const currentEnvironment = process.env.NODE_ENV || "development";

const config: IConfig = {
  ...environments[currentEnvironment],
};

export default config;
