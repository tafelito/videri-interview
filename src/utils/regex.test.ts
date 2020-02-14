import {
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_DATE,
  REGEX_FILENAME,
} from './regex';

describe('RegExp validations', () => {
  const validEmails = [
    'email@domain.com',
    'firstname.lastname@domain.com',
    'email@subdomain.domain.com',
    'firstname+lastname@domain.com',
    'email@123.123.123.123',
    'email@[123.123.123.123]',
    '"email"@domain.com',
    '1234567890@domain.com',
    'email@domain-one.com',
    '_______@domain.com',
    'email@domain.name',
    'email@domain.co.jp',
    'firstname-lastname@domain.com',
  ];

  const invalidEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@domain.com',
    'Joe Smith <email@domain.com>',
    'email.domain.com',
    'email@domain@domain.com',
    '.email@domain.com',
    'email.@domain.com',
    'email..email@domain.com',
    'あいうえお@domain.com',
    'email@domain.com (Joe Smith)',
    'email@domain',
    'email@-domain.com',
    // 'email@domain.web', //valid email
    // 'email@111.222.333.44444', //valid email
    'email@domain..com',
  ];

  const validPasswords = ['Aa11%$cccc', 'g$jkKK44Q!'];
  const invalidPasswords = ['$hort1', 'abcd123$', '12345678', 'Abcd123'];

  test('validates correct emails', () => {
    for (const email of validEmails) {
      expect(email).toMatch(REGEX_EMAIL);
    }
  });

  test('validates incorrect emails', () => {
    for (const email of invalidEmails) {
      expect(email).not.toMatch(REGEX_EMAIL);
    }
  });

  test('validates correct password', () => {
    for (const password of validPasswords) {
      expect(password).toMatch(REGEX_PASSWORD);
    }
  });

  test('validates incorrect password', () => {
    for (const password of invalidPasswords) {
      expect(password).not.toMatch(REGEX_PASSWORD);
    }
  });

  test('validates date with format YYYY/MM/DD', () => {
    expect('2014/10/15').toMatch(REGEX_DATE);
    expect('2014/07/31').toMatch(REGEX_DATE);
    expect('2014/15/10').not.toMatch(REGEX_DATE);
    expect('20/10/2015').not.toMatch(REGEX_DATE);
    expect('2/1/20').not.toMatch(REGEX_DATE);
  });

  test('validates file names from url', () => {
    const video = 'https://player.vimeo.com/external/135736646.hd.mp4?s=ed02d71c92dd0df7d1110045e6eb65a6&profile_id=119'.match(
      REGEX_FILENAME,
    );
    expect(video).not.toBe(null);
    expect(video![0]).toEqual('135736646.hd.mp4');
    const image = 'https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg'.match(
      REGEX_FILENAME,
    );
    expect(image).not.toBe(null);
    expect(image![0]).toEqual('flower-195893_150.jpg');
  });
});
