class UrlDomainModel {
  public protocol: string;
  public domain: string;
  public URL: string;

  public constructor(url: string) {
    const splitURL = url.split(`://`);
    this.protocol = `${splitURL[0]}://`;
    this.domain = `${splitURL[1]}/`;
    this.URL = url;
  }
}

export default UrlDomainModel;
