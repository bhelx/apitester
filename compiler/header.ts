import { JSON, JSONEncoder } from 'assemblyscript-json/assembly'
import { Host } from '@extism/as-pdk';

// @ts-ignore
import {myAbort} from './abort'

class HttpRequest {
  method: string;
  path: string;
  constructor(method: string, path: string) {
    this.method = method;
    this.path = path;
  }
}

type PlainObject = Map<string, string>;

class HttpResponse {
  statusCode: u32;
  sleepFor: u32;
  additionalHeaders: PlainObject;
  body: string;
  contentType: string;

  constructor(statusCode: u32, sleepFor: u32, additionalHeaders: PlainObject, body: string, contentType: string) {
    this.statusCode = statusCode;
    this.sleepFor = sleepFor;
    this.additionalHeaders = additionalHeaders;
    this.body = body;
    this.contentType = contentType;
  }
}

class HttpResponseResult {
  response: HttpResponse;
  constructor(response: HttpResponse) {
    this.response = response;
  }

 stringify(): string {
    const encoder = new JSONEncoder();
    encoder.pushObject("response");
    encoder.setInteger("status_code", this.response.statusCode);
    encoder.setInteger("sleep_for", this.response.sleepFor);
    encoder.pushObject("additional_headers");
    const headerKeys = this.response.additionalHeaders.keys();
    for (let i = 0; i < headerKeys.length; i++) {
      const key = headerKeys[i];
      const value = this.response.additionalHeaders.get(key);
      if (key == null || value === null) throw new Error("no nulls!");
      encoder.setString(key, value);
    }
    encoder.popObject(); // additional_headers
    encoder.setString("body", this.response.body);
    encoder.setString("content_type", this.response.contentType);
    encoder.popObject(); // response
    return '{' + encoder.toString() + "}";
  }
}

function getRequest(host: Host): HttpRequest {
  const requestStr = host.inputString();
  const jsonObj: JSON.Obj = <JSON.Obj>(JSON.parse(requestStr));
  const method = jsonObj.getString("method");
  if (method == null) throw new Error("http request missing method");
  const path = jsonObj.getString("path");
  if (path == null) throw new Error("http request missing path");
  let httpRequest = new HttpRequest(
    method.valueOf(),
    path.valueOf()
  );
  return httpRequest;
}

function respondWith(host: Host, response: HttpResponse): void {
    const result = new HttpResponseResult(response);
    host.outputString(result.stringify());
}