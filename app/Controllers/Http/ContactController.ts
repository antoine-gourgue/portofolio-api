// app/Controllers/Http/ContactController.ts

import Mail from '@ioc:Adonis/Addons/Mail'

export default class ContactController {
  public async send({ request, response }) {
    const formData = request.only([
      'hs-firstname-contacts-1',
      'hs-lastname-contacts-1',
      'hs-email-contacts-1',
      'hs-phone-number-1',
      'hs-about-contacts-1'
    ]);

    const data = {
      name: request.input('hs-firstname-contacts-1') + ' ' + request.input('hs-lastname-contacts-1'),
      email: request.input('hs-email-contacts-1'),
      phone: request.input('hs-phone-number-1'),
      message: request.input('hs-about-contacts-1')
    };

    try {
      await Mail.send((message) => {
        message
          .from(data.email)
          .to('antoine.gourguemail@gmail.com')
          .subject('New Contact Inquiry')
          .htmlView('emails/contact', data)
      });
      console.log(formData)

      return response.status(201).send({ message: 'Thank you for your inquiry. We will get back to you soon!' });

    } catch (error) {
      console.error('Mail sending error:', error);
      return response.status(500).send({ message: 'Something went wrong, please try again later.' });
    }
  }
}
