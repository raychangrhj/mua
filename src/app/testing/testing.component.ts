import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'regions-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {

  public output: any;
  public applicationMasterId: string;
  public applicationLastFourSSN: string;
  public applicationAccessCode: string;
  public applicationEmail: string;
  public loginusername: string;
  public loginpassword: string;
  public challengeId: string;
  public challengeQuestionId: string;
  public challengeSessionId: string;
  public challengeAnswer: string;
  public challengeVersion: string;
  public challengeEmail: string;
  public footPrintStateName: string;
  public footPrintStateCode: string;
  public loanOfficerWebsite: string;
  public loanOfficerCrc: string;
  public loanOfficerId: string;
  public loanOfficerAssociateId: string;

  public postProxyApiHeartBeat() {
    this.http.post('api/app/proxy/heartbeat', null).subscribe(data => {
      this.output = data;
    });
  }

  public postRmappApiHeartBeat() {
    this.http.post('api/app/heartbeat', null).subscribe(data => {
      this.output = data;
    });
  }

  public postLocatorApiHeartBeat() {
    this.http.post('api/locator/heartbeat', null).subscribe(data => {
      this.output = data;
    });
  }

  public postPrefillApiHeartBeat() {
    this.http.post('api/prefill/heartbeat', null).subscribe(data => {
      this.output = data;
    });
  }

  public postUserPass() {
    this.http.post('api/prefill/cq/olb', {
      UserName: this.loginusername,
      password: this.loginpassword
    }).subscribe(data => {
      this.output = data;
    });
  }

  public postChallengeQuestion() {
    this.http.post('api/prefill/acq/olb', {
      Id: this.challengeId,
      QuestionId: this.challengeQuestionId,
      SessionId: this.challengeSessionId,
      Answer: this.challengeAnswer,
      Version: this.challengeVersion,
      Email: this.challengeEmail
    }).subscribe(data => {
      this.output = data;
    });
  }

  public postApplication() {
    this.http.post('api/app/retrieve', {
      MasterId: this.applicationMasterId,
      LastFourSSN: this.applicationLastFourSSN,
      AccessCode: this.applicationAccessCode,
      Email: this.applicationEmail
    }).subscribe(data => {
      this.output = data;
    });
  }

  public getFootPrintByStateName() {
    this.http.get(`api/app/footprint/name/${this.footPrintStateName}`).subscribe(data => {
      this.output = data;
    });
  }

  public getFootPrintByStateCode() {
    this.http.get(`api/app/footprint/code/${this.footPrintStateCode}`).subscribe(data => {
      this.output = data;
    });
  }

  public getLoanOfficerWebsite() {
    this.http.get(`api/locator/officer/website/${this.loanOfficerWebsite}`).subscribe(data => {
      this.output = data;
    });
  }

  public getLoanOfficerCrc() {
    this.http.get(`api/locator/officer/inrotation/crc/${this.loanOfficerCrc}`).subscribe(data => {
      this.output = data;
    });
  }

  public getLoanOfficerById() {
    this.http.get(`api/locator/lid/loanOfficerId/${this.loanOfficerId}`).subscribe(data => {
      this.output = data;
    });
  }

  public getLoanOfficerManager() {
    this.http.get(`api/locator/officer/managerinfo/${this.loanOfficerAssociateId}`).subscribe(data => {
      this.output = data;
    });
  }

  constructor(private http: HttpClient) { }

}
