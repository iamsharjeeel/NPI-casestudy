import { parsePhoneNumberFromString } from "libphonenumber-js";

export function toE164(input: string, defaultCountry: "US" = "US"): string {
  const phone = parsePhoneNumberFromString(input, defaultCountry);
  if (!phone || !phone.isValid()) {
    throw new Error("Enter a valid phone number with country code if outside the US.");
  }
  return phone.number;
}
