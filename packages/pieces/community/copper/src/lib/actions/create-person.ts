import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { copperAuth } from '../common/auth';

export const createPerson = createAction({
  auth: copperAuth,
  name: 'create_person',
  displayName: 'Create Person',
  description: 'Adds a new person/contact to Copper CRM.',
  props: {
    name: Property.ShortText({
      displayName: 'Name',
      description: 'Full name of the person',
      required: true,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      description: 'Primary email address',
      required: false,
    }),
    emailCategory: Property.StaticDropdown({
      displayName: 'Email Category',
      description: 'Category for the email address',
      required: false,
      defaultValue: 'work',
      options: {
        disabled: false,
        options: [
          { label: 'Work', value: 'work' },
          { label: 'Personal', value: 'personal' },
          { label: 'Other', value: 'other' },
        ],
      },
    }),
    phoneNumber: Property.ShortText({
      displayName: 'Phone Number',
      description: 'Primary phone number',
      required: false,
    }),
    phoneCategory: Property.StaticDropdown({
      displayName: 'Phone Category',
      description: 'Category for the phone number',
      required: false,
      defaultValue: 'mobile',
      options: {
        disabled: false,
        options: [
          { label: 'Mobile', value: 'mobile' },
          { label: 'Work', value: 'work' },
          { label: 'Home', value: 'home' },
          { label: 'Other', value: 'other' },
        ],
      },
    }),
    title: Property.ShortText({
      displayName: 'Title',
      description: 'Job title or position',
      required: false,
    }),
    companyId: Property.Number({
      displayName: 'Company ID',
      description: 'ID of the company this person belongs to',
      required: false,
    }),
    street: Property.ShortText({
      displayName: 'Street Address',
      description: 'Street address',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'City',
      description: 'City',
      required: false,
    }),
    state: Property.ShortText({
      displayName: 'State',
      description: 'State or province',
      required: false,
    }),
    postalCode: Property.ShortText({
      displayName: 'Postal Code',
      description: 'Postal or ZIP code',
      required: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      description: 'Country',
      required: false,
    }),
    tags: Property.Array({
      displayName: 'Tags',
      description: 'Tags associated with this person',
      required: false,
    }),
  },
  async run(context) {
    const {
      name,
      email,
      emailCategory,
      phoneNumber,
      phoneCategory,
      title,
      companyId,
      street,
      city,
      state,
      postalCode,
      country,
      tags,
    } = context.propsValue;

    const requestBody: any = {
      name: name,
    };

    // Add emails if provided
    if (email) {
      requestBody.emails = [
        {
          email: email,
          category: emailCategory || 'work',
        },
      ];
    }

    // Add phone numbers if provided
    if (phoneNumber) {
      requestBody.phone_numbers = [
        {
          number: phoneNumber,
          category: phoneCategory || 'mobile',
        },
      ];
    }

    // Add other fields if provided
    if (title) requestBody.title = title;
    if (companyId) requestBody.company_id = companyId;
    if (tags && tags.length > 0) requestBody.tags = tags;

    // Add address if any address field is provided
    if (street || city || state || postalCode || country) {
      requestBody.address = {
        ...(street && { street }),
        ...(city && { city }),
        ...(state && { state }),
        ...(postalCode && { postal_code: postalCode }),
        ...(country && { country }),
      };
    }

    try {
      const response = await httpClient.sendRequest({
        method: HttpMethod.POST,
        url: 'https://api.copper.com/developer_api/v1/people',
        headers: {
          'X-PW-AccessToken': context.auth.apiKey,
          'X-PW-Application': 'developer_api',
          'X-PW-UserEmail': context.auth.userEmail,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      return response.body;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(`Bad request: ${JSON.stringify(error.response.body)}`);
      }
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key and user email.');
      }
      if (error.response?.status === 403) {
        throw new Error('Access forbidden. Please check your permissions.');
      }
      throw new Error(`Error creating person: ${error.message}`);
    }
  },
});
