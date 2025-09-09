import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { copperAuth } from '../common/auth';

export const updateLead = createAction({
  auth: copperAuth,
  name: 'update_lead',
  displayName: 'Update Lead',
  description: 'Updates an existing lead. Only specified fields will be updated.',
  props: {
    leadId: Property.ShortText({
      displayName: 'Lead ID',
      description: 'The ID of the lead to update',
      required: true,
    }),
    name: Property.ShortText({
      displayName: 'Name',
      description: 'Full name of the lead',
      required: false,
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
    customerSourceId: Property.Number({
      displayName: 'Customer Source ID',
      description: 'ID of the customer source for this lead',
      required: false,
    }),
    details: Property.LongText({
      displayName: 'Details',
      description: 'Additional details about the lead',
      required: false,
    }),
    title: Property.ShortText({
      displayName: 'Title',
      description: 'Job title or position',
      required: false,
    }),
    companyName: Property.ShortText({
      displayName: 'Company Name',
      description: 'Name of the company',
      required: false,
    }),
    monetaryValue: Property.Number({
      displayName: 'Monetary Value',
      description: 'Expected monetary value of the lead',
      required: false,
    }),
    assigneeId: Property.Number({
      displayName: 'Assignee ID',
      description: 'ID of the user assigned to this lead',
      required: false,
    }),
    statusId: Property.Number({
      displayName: 'Status ID',
      description: 'ID of the status for this lead',
      required: false,
    }),
    customField1Id: Property.Number({
      displayName: 'Custom Field 1 ID',
      description: 'ID of the first custom field definition',
      required: false,
    }),
    customField1Value: Property.ShortText({
      displayName: 'Custom Field 1 Value',
      description: 'Value for the first custom field',
      required: false,
    }),
    customField2Id: Property.Number({
      displayName: 'Custom Field 2 ID',
      description: 'ID of the second custom field definition',
      required: false,
    }),
    customField2Value: Property.ShortText({
      displayName: 'Custom Field 2 Value',
      description: 'Value for the second custom field',
      required: false,
    }),
    customField3Id: Property.Number({
      displayName: 'Custom Field 3 ID',
      description: 'ID of the third custom field definition',
      required: false,
    }),
    customField3Value: Property.ShortText({
      displayName: 'Custom Field 3 Value',
      description: 'Value for the third custom field',
      required: false,
    }),
    clearEmail: Property.Checkbox({
      displayName: 'Clear Email',
      description: 'Set to true to remove the email field (set to null)',
      required: false,
      defaultValue: false,
    }),
    clearPhone: Property.Checkbox({
      displayName: 'Clear Phone',
      description: 'Set to true to remove the phone number field (set to null)',
      required: false,
      defaultValue: false,
    }),
    clearAddress: Property.Checkbox({
      displayName: 'Clear Address',
      description: 'Set to true to remove the address field (set to null)',
      required: false,
      defaultValue: false,
    }),
  },
  async run(context) {
    const {
      leadId,
      name,
      email,
      emailCategory,
      phoneNumber,
      phoneCategory,
      street,
      city,
      state,
      postalCode,
      country,
      customerSourceId,
      details,
      title,
      companyName,
      monetaryValue,
      assigneeId,
      statusId,
      customField1Id,
      customField1Value,
      customField2Id,
      customField2Value,
      customField3Id,
      customField3Value,
      clearEmail,
      clearPhone,
      clearAddress,
    } = context.propsValue;

    // Build the request body - only include fields that are provided
    const requestBody: any = {};

    // Add basic fields if provided
    if (name !== undefined && name !== '') {
      requestBody.name = name;
    }
    if (details !== undefined && details !== '') {
      requestBody.details = details;
    }
    if (title !== undefined && title !== '') {
      requestBody.title = title;
    }
    if (companyName !== undefined && companyName !== '') {
      requestBody.company_name = companyName;
    }
    if (monetaryValue !== undefined) {
      requestBody.monetary_value = monetaryValue;
    }
    if (customerSourceId !== undefined) {
      requestBody.customer_source_id = customerSourceId;
    }
    if (assigneeId !== undefined) {
      requestBody.assignee_id = assigneeId;
    }
    if (statusId !== undefined) {
      requestBody.status_id = statusId;
    }

    // Handle email - either update, clear, or leave unchanged
    if (clearEmail) {
      requestBody.email = null;
    } else if (email !== undefined && email !== '') {
      requestBody.email = {
        email: email,
        category: emailCategory || 'work',
      };
    }

    // Handle phone number - either update, clear, or leave unchanged
    if (clearPhone) {
      requestBody.phone_numbers = null;
    } else if (phoneNumber !== undefined && phoneNumber !== '') {
      requestBody.phone_numbers = [
        {
          number: phoneNumber,
          category: phoneCategory || 'mobile',
        },
      ];
    }

    // Handle address - either update, clear, or leave unchanged
    if (clearAddress) {
      requestBody.address = null;
    } else if (street || city || state || postalCode || country) {
      requestBody.address = {
        ...(street && { street }),
        ...(city && { city }),
        ...(state && { state }),
        ...(postalCode && { postal_code: postalCode }),
        ...(country && { country }),
      };
    }

    // Add custom fields if provided
    const customFields = [];
    if (customField1Id && customField1Value) {
      customFields.push({
        custom_field_definition_id: customField1Id,
        value: customField1Value,
      });
    }
    if (customField2Id && customField2Value) {
      customFields.push({
        custom_field_definition_id: customField2Id,
        value: customField2Value,
      });
    }
    if (customField3Id && customField3Value) {
      customFields.push({
        custom_field_definition_id: customField3Id,
        value: customField3Value,
      });
    }

    if (customFields.length > 0) {
      requestBody.custom_fields = customFields;
    }

    // If no fields are provided, return early
    if (Object.keys(requestBody).length === 0) {
      throw new Error('No fields provided for update. Please specify at least one field to update.');
    }

    try {
      const response = await httpClient.sendRequest({
        method: HttpMethod.PUT,
        url: `https://api.copper.com/developer_api/v1/leads/${leadId}`,
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
      if (error.response?.status === 404) {
        throw new Error(`Lead with ID ${leadId} not found.`);
      }
      throw new Error(`Error updating lead: ${error.message}`);
    }
  },
});
