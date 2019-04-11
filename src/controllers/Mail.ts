import { Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Patch, Post, UnauthorizedError } from "routing-controllers";
import { EntityFromBody } from "typeorm-routing-controllers-extensions";

import * as sgMail from "@sendgrid/mail"
import { Account } from "../Entity/Account"
import * as Auth from "../lib/auth";

@JsonController()
export class MailController {
  @Post("/mail/")
  public async save(@CurrentUser({ required: false }) user: Account, @Body() body: any) {
    if (Auth.isAuthorized(user, ["create events"])) {
      sgMail.setApiKey("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");
      sgMail.send(body);
      return body;
    } else {
      throw new UnauthorizedError("You do not have sufficient permissions to create a new user.");
    }
  }
}
