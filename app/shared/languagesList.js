"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.language = exports.elasticLanguages = exports.availableLanguages = void 0; /* eslint-disable max-lines */


const elasticLanguages =

{
  arb: { franc: 'arb', elastic: 'arabic', ISO639_1: 'ar' },
  bul: { franc: 'bul', elastic: 'bulgarian', ISO639_1: 'bg' },
  cat: { franc: 'cat', elastic: 'catalan', ISO639_1: 'ca' },
  cjk: { franc: 'cjk', elastic: 'cjk', ISO639_1: null },
  ckb: { franc: 'ckb', elastic: 'sorani', ISO639_1: null },
  ces: { franc: 'ces', elastic: 'czech', ISO639_1: 'cs' },
  dan: { franc: 'dan', elastic: 'danish', ISO639_1: 'da' },
  deu: { franc: 'deu', elastic: 'german', ISO639_1: 'de' },
  ell: { franc: 'ell', elastic: 'greek', ISO639_1: 'el' },
  eng: { franc: 'eng', elastic: 'english', ISO639_1: 'en' },
  eus: { franc: 'eus', elastic: 'basque', ISO639_1: 'eu' },
  fas: { franc: 'fas', elastic: 'persian', ISO639_1: 'fa' },
  fin: { franc: 'fin', elastic: 'finnish', ISO639_1: 'fi' },
  fra: { franc: 'fra', elastic: 'french', ISO639_1: 'fr' },
  gle: { franc: 'gle', elastic: 'irish', ISO639_1: 'ga' },
  glg: { franc: 'glg', elastic: 'galician', ISO639_1: 'gl' },
  hin: { franc: 'hin', elastic: 'hindi', ISO639_1: 'hi' },
  hun: { franc: 'hun', elastic: 'hungarian', ISO639_1: 'hu' },
  hye: { franc: 'hye', elastic: 'armenian', ISO639_1: 'hy' },
  ind: { franc: 'ind', elastic: 'indonesian', ISO639_1: 'id' },
  ita: { franc: 'ita', elastic: 'italian', ISO639_1: 'it' },
  lav: { franc: 'lav', elastic: 'latvian', ISO639_1: 'lv' },
  lit: { franc: 'lit', elastic: 'lithuanian', ISO639_1: 'lt' },
  nld: { franc: 'nld', elastic: 'dutch', ISO639_1: 'nl' },
  nno: { franc: 'nno', elastic: 'norwegian', ISO639_1: 'nn' },
  nob: { franc: 'nob', elastic: 'norwegian', ISO639_1: 'nb' },
  por: { franc: 'por', elastic: 'portuguese', ISO639_1: 'pt' },
  ron: { franc: 'ron', elastic: 'romanian', ISO639_1: 'ro' },
  rus: { franc: 'rus', elastic: 'russian', ISO639_1: 'ru' },
  spa: { franc: 'spa', elastic: 'spanish', ISO639_1: 'es' },
  swe: { franc: 'swe', elastic: 'swedish', ISO639_1: 'sv' },
  tha: { franc: 'tha', elastic: 'thai', ISO639_1: 'th' },
  tur: { franc: 'tur', elastic: 'turkish', ISO639_1: 'tr' } };exports.elasticLanguages = elasticLanguages;


const availableLanguages = [
{
  label: 'Abkhazian',
  key: 'ab',
  ISO639_3: 'abk',
  localized_label: 'Abkhazian',
  translationAvailable: false },

{
  label: 'Afar',
  key: 'aa',
  ISO639_3: 'aar',
  localized_label: 'Afar',
  translationAvailable: false },

{
  label: 'Afrikaans',
  key: 'af',
  ISO639_3: 'afr',
  localized_label: 'Afrikaans',
  translationAvailable: false },

{
  label: 'Akan',
  key: 'ak',
  ISO639_3: 'aka',
  localized_label: 'Akan',
  translationAvailable: false },

{
  label: 'Albanian',
  key: 'sq',
  ISO639_3: 'sqi',
  localized_label: 'Shqip',
  translationAvailable: false },

{
  label: 'Amharic',
  key: 'am',
  ISO639_3: 'amh',
  localized_label: 'አማርኛ',
  translationAvailable: false },

{
  label: 'Arabic',
  key: 'ar',
  rtl: true,
  ISO639_3: 'ara',
  localized_label: 'العربية',
  translationAvailable: true },

{
  label: 'Aragonese',
  key: 'an',
  ISO639_3: 'arg',
  localized_label: 'Aragonese',
  translationAvailable: false },

{
  label: 'Armenian',
  key: 'hy',
  ISO639_3: 'hye',
  localized_label: 'Հայերեն',
  translationAvailable: false },

{
  label: 'Assamese',
  key: 'as',
  ISO639_3: 'asm',
  localized_label: 'অসমীয়া',
  translationAvailable: false },

{
  label: 'Avaric',
  key: 'av',
  ISO639_3: 'ava',
  localized_label: 'Avaric',
  translationAvailable: false },

{
  label: 'Avestan',
  key: 'ae',
  ISO639_3: 'ave',
  localized_label: 'Avestan',
  translationAvailable: false },

{
  label: 'Aymara',
  key: 'ay',
  ISO639_3: 'aym',
  localized_label: 'Aymara',
  translationAvailable: false },

{
  label: 'Azerbaijani',
  key: 'az',
  ISO639_3: 'aze',
  localized_label: 'Azərbaycan',
  translationAvailable: false },

{
  label: 'Bambara',
  key: 'bm',
  ISO639_3: 'bam',
  localized_label: 'Bamanakan',
  translationAvailable: false },

{
  label: 'Bashkir',
  key: 'ba',
  ISO639_3: 'bak',
  localized_label: 'Bashkir',
  translationAvailable: false },

{
  label: 'Basque',
  key: 'eu',
  ISO639_3: 'eus',
  localized_label: 'Euskara',
  translationAvailable: false },

{
  label: 'Belarusian',
  key: 'be',
  ISO639_3: 'bel',
  localized_label: 'Беларуская',
  translationAvailable: false },

{
  label: 'Bengali (Bangla)',
  key: 'bn',
  ISO639_3: 'ben',
  localized_label: 'বাংলা',
  translationAvailable: false },

{
  label: 'Bihari',
  key: 'bh',
  ISO639_3: 'bih',
  localized_label: 'Bhojpuri',
  translationAvailable: false },

{
  label: 'Bislama',
  key: 'bi',
  ISO639_3: 'bis',
  localized_label: 'Bislama',
  translationAvailable: false },

{
  label: 'Bosnian',
  key: 'bs',
  ISO639_3: 'bos',
  localized_label: 'Bosanski',
  translationAvailable: false },

{
  label: 'Breton',
  key: 'br',
  ISO639_3: 'bre',
  localized_label: 'Brezhoneg',
  translationAvailable: false },

{
  label: 'Bulgarian',
  key: 'bg',
  ISO639_3: 'bul',
  localized_label: 'Български',
  translationAvailable: false },

{
  label: 'Burmese',
  key: 'my',
  ISO639_3: 'mya',
  localized_label: 'မြန်မာ',
  translationAvailable: true },

{
  label: 'Catalan',
  key: 'ca',
  ISO639_3: 'cat',
  localized_label: 'Català',
  translationAvailable: false },

{
  label: 'Chamorro',
  key: 'ch',
  ISO639_3: 'cha',
  localized_label: 'Chamorro',
  translationAvailable: false },

{
  label: 'Chechen',
  key: 'ce',
  ISO639_3: 'che',
  localized_label: 'Нохчийн',
  translationAvailable: false },

{
  label: 'Chichewa, Chewa, Nyanja',
  key: 'ny',
  ISO639_3: 'nya',
  localized_label: 'Nyanja',
  translationAvailable: false },

{
  label: 'Chinese',
  key: 'zh',
  ISO639_3: 'zho',
  localized_label: '中文',
  translationAvailable: false },

{
  label: 'Chinese (Simplified)',
  key: 'zh-Hans',
  ISO639_3: 'zho-Hans',
  localized_label: '简体中文',
  translationAvailable: false },

{
  label: 'Chinese (Traditional)',
  key: 'zh-Hant',
  ISO639_3: 'zho-Hant',
  localized_label: '繁體中文',
  translationAvailable: false },

{
  label: 'Chuvash',
  key: 'cv',
  ISO639_3: 'chv',
  localized_label: 'Chuvash',
  translationAvailable: false },

{
  label: 'Cornish',
  key: 'kw',
  ISO639_3: 'cor',
  localized_label: 'Kernewek',
  translationAvailable: false },

{
  label: 'Corsican',
  key: 'co',
  ISO639_3: 'cos',
  localized_label: 'Corsican',
  translationAvailable: false },

{
  label: 'Cree',
  key: 'cr',
  ISO639_3: 'cre',
  localized_label: 'Cree',
  translationAvailable: false },

{
  label: 'Croatian',
  key: 'hr',
  ISO639_3: 'hrv',
  localized_label: 'Hrvatski',
  translationAvailable: false },

{
  label: 'Czech',
  key: 'cs',
  ISO639_3: 'ces',
  localized_label: 'Čeština',
  translationAvailable: false },

{
  label: 'Danish',
  key: 'da',
  ISO639_3: 'dan',
  localized_label: 'Dansk',
  translationAvailable: false },

{
  label: 'Divehi, Dhivehi, Maldivian',
  key: 'dv',
  rtl: true,
  ISO639_3: 'div',
  localized_label: 'Divehi',
  translationAvailable: false },

{
  label: 'Dutch',
  key: 'nl',
  ISO639_3: 'nld',
  localized_label: 'Nederlands',
  translationAvailable: false },

{
  label: 'Dzongkha',
  key: 'dz',
  ISO639_3: 'dzo',
  localized_label: 'རྫོང་ཁ',
  translationAvailable: false },

{
  label: 'English',
  key: 'en',
  ISO639_3: 'eng',
  localized_label: 'English',
  translationAvailable: false },

{
  label: 'Esperanto',
  key: 'eo',
  ISO639_3: 'epo',
  localized_label: 'Esperanto',
  translationAvailable: false },

{
  label: 'Estonian',
  key: 'et',
  ISO639_3: 'est',
  localized_label: 'Eesti',
  translationAvailable: false },

{
  label: 'Ewe',
  key: 'ee',
  ISO639_3: 'ewe',
  localized_label: 'Eʋegbe',
  translationAvailable: false },

{
  label: 'Faroese',
  key: 'fo',
  ISO639_3: 'fao',
  localized_label: 'Føroyskt',
  translationAvailable: false },

{
  label: 'Fijian',
  key: 'fj',
  ISO639_3: 'fij',
  localized_label: 'Fijian',
  translationAvailable: false },

{
  label: 'Finnish',
  key: 'fi',
  ISO639_3: 'fin',
  localized_label: 'Suomi',
  translationAvailable: false },

{
  label: 'French',
  key: 'fr',
  ISO639_3: 'fra',
  localized_label: 'Français',
  translationAvailable: true },

{
  label: 'Fula, Fulah, Pulaar, Pular',
  key: 'ff',
  ISO639_3: 'ful',
  localized_label: 'Pulaar',
  translationAvailable: false },

{
  label: 'Galician',
  key: 'gl',
  ISO639_3: 'glg',
  localized_label: 'Galego',
  translationAvailable: false },

{
  label: 'Gaelic Scottish',
  key: 'gd',
  ISO639_3: 'gla',
  localized_label: 'Gàidhlig',
  translationAvailable: false },

{
  label: 'Gaelic (Manx)',
  key: 'gv',
  ISO639_3: 'glv',
  localized_label: 'Gaelg',
  translationAvailable: false },

{
  label: 'Georgian',
  key: 'ka',
  ISO639_3: 'kat',
  localized_label: 'Ქართული',
  translationAvailable: false },

{
  label: 'German',
  key: 'de',
  ISO639_3: 'deu',
  localized_label: 'Deutsch',
  translationAvailable: false },

{
  label: 'Greek',
  key: 'el',
  ISO639_3: 'ell',
  localized_label: 'Ελληνικά',
  translationAvailable: false },

{
  label: 'Guarani',
  key: 'gn',
  ISO639_3: 'grn',
  localized_label: 'Guarani',
  translationAvailable: false },

{
  label: 'Gujarati',
  key: 'gu',
  ISO639_3: 'guj',
  localized_label: 'ગુજરાતી',
  translationAvailable: false },

{
  label: 'Haitian Creole',
  key: 'ht',
  ISO639_3: 'hat',
  localized_label: 'Haitian Creole',
  translationAvailable: false },

{
  label: 'Hausa',
  key: 'ha',
  rtl: true,
  ISO639_3: 'hau',
  localized_label: 'Hausa',
  translationAvailable: false },

{
  label: 'Hebrew',
  key: 'he',
  rtl: true,
  ISO639_3: 'heb',
  localized_label: 'עברית',
  translationAvailable: false },

{
  label: 'Herero',
  key: 'hz',
  ISO639_3: 'her',
  localized_label: 'Herero',
  translationAvailable: false },

{
  label: 'Hindi',
  key: 'hi',
  ISO639_3: 'hin',
  localized_label: 'हिन्दी',
  translationAvailable: false },

{
  label: 'Hiri Motu',
  key: 'ho',
  ISO639_3: 'hmo',
  localized_label: 'Hiri Motu',
  translationAvailable: false },

{
  label: 'Hungarian',
  key: 'hu',
  ISO639_3: 'hun',
  localized_label: 'Magyar',
  translationAvailable: false },

{
  label: 'Icelandic',
  key: 'is',
  ISO639_3: 'isl',
  localized_label: 'Íslenska',
  translationAvailable: false },

{
  label: 'Ido',
  key: 'io',
  ISO639_3: 'ido',
  localized_label: 'Ido',
  translationAvailable: false },

{
  label: 'Igbo',
  key: 'ig',
  ISO639_3: 'ibo',
  localized_label: 'Igbo',
  translationAvailable: false },

{
  label: 'Indonesian',
  key: 'in',
  ISO639_3: 'ind',
  localized_label: 'Indonesia',
  translationAvailable: false },

{
  label: 'Interlingua',
  key: 'ia',
  ISO639_3: 'ina',
  localized_label: 'Interlingua',
  translationAvailable: false },

{
  label: 'Interlingue',
  key: 'ie',
  ISO639_3: 'ile',
  localized_label: 'Interlingue',
  translationAvailable: false },

{
  label: 'Inuktitut',
  key: 'iu',
  ISO639_3: 'iku',
  localized_label: 'Inuktitut',
  translationAvailable: false },

{
  label: 'Inupiak',
  key: 'ik',
  ISO639_3: 'ipk',
  localized_label: 'Inupiaq',
  translationAvailable: false },

{
  label: 'Irish',
  key: 'ga',
  ISO639_3: 'gle',
  localized_label: 'Gaeilge',
  translationAvailable: false },

{
  label: 'Italian',
  key: 'it',
  ISO639_3: 'ita',
  localized_label: 'Italiano',
  translationAvailable: false },

{
  label: 'Japanese',
  key: 'ja',
  ISO639_3: 'jpn',
  localized_label: '日本語',
  translationAvailable: false },

{
  label: 'Javanese',
  key: 'jv',
  ISO639_3: 'jav',
  localized_label: 'Jawa',
  translationAvailable: false },

{
  label: 'Kalaallisut, Greenlandic',
  key: 'kl',
  ISO639_3: 'kal',
  localized_label: 'Kalaallisut',
  translationAvailable: false },

{
  label: 'Kannada',
  key: 'kn',
  ISO639_3: 'kan',
  localized_label: 'ಕನ್ನಡ',
  translationAvailable: false },

{
  label: 'Kanuri',
  key: 'kr',
  ISO639_3: 'kau',
  localized_label: 'Kanuri',
  translationAvailable: false },

{
  label: 'Kashmiri',
  key: 'ks',
  rtl: true,
  ISO639_3: 'kas',
  localized_label: 'کٲشُر',
  translationAvailable: false },

{
  label: 'Kazakh',
  key: 'kk',
  ISO639_3: 'kaz',
  localized_label: 'Қазақ тілі',
  translationAvailable: false },

{
  label: 'Khmer',
  key: 'km',
  ISO639_3: 'khm',
  localized_label: 'ខ្មែរ',
  translationAvailable: false },

{
  label: 'Kikuyu',
  key: 'ki',
  ISO639_3: 'kik',
  localized_label: 'Gikuyu',
  translationAvailable: false },

{
  label: 'Kinyarwanda (Rwanda)',
  key: 'rw',
  ISO639_3: 'kin',
  localized_label: 'Kinyarwanda',
  translationAvailable: false },

{
  label: 'Kirundi',
  key: 'rn',
  ISO639_3: 'run',
  localized_label: 'Ikirundi',
  translationAvailable: false },

{
  label: 'Kyrgyz',
  key: 'ky',
  ISO639_3: 'kir',
  localized_label: 'Кыргызча',
  translationAvailable: false },

{
  label: 'Komi',
  key: 'kv',
  ISO639_3: 'kom',
  localized_label: 'Komi',
  translationAvailable: false },

{
  label: 'Kongo',
  key: 'kg',
  ISO639_3: 'kon',
  localized_label: 'Kongo',
  translationAvailable: false },

{
  label: 'Korean',
  key: 'ko',
  ISO639_3: 'kor',
  localized_label: '한국어',
  translationAvailable: false },

{
  label: 'Kurdish',
  key: 'ku',
  rtl: true,
  ISO639_3: 'kur',
  localized_label: 'Kurdî',
  translationAvailable: false },

{
  label: 'Kwanyama',
  key: 'kj',
  ISO639_3: 'kua',
  localized_label: 'Kuanyama',
  translationAvailable: false },

{
  label: 'Lao',
  key: 'lo',
  ISO639_3: 'lao',
  localized_label: 'ລາວ',
  translationAvailable: false },

{
  label: 'Latin',
  key: 'la',
  ISO639_3: 'lat',
  localized_label: 'Latin',
  translationAvailable: false },

{
  label: 'Latvian (Lettish)',
  key: 'lv',
  ISO639_3: 'lav',
  localized_label: 'Latviešu',
  translationAvailable: false },

{
  label: 'Limburgish (Limburger)',
  key: 'li',
  ISO639_3: 'lim',
  localized_label: 'Limburgish',
  translationAvailable: false },

{
  label: 'Lingala',
  key: 'ln',
  ISO639_3: 'lin',
  localized_label: 'Lingála',
  translationAvailable: false },

{
  label: 'Lithuanian',
  key: 'lt',
  ISO639_3: 'lit',
  localized_label: 'Lietuvių',
  translationAvailable: false },

{
  label: 'Luga-Katanga',
  key: 'lu',
  ISO639_3: 'lub',
  localized_label: 'Tshiluba',
  translationAvailable: false },

{
  label: 'Luganda, Ganda',
  key: 'lg',
  ISO639_3: 'lug',
  localized_label: 'Luganda',
  translationAvailable: false },

{
  label: 'Luxembourgish',
  key: 'lb',
  ISO639_3: 'ltz',
  localized_label: 'Lëtzebuergesch',
  translationAvailable: false },

{
  label: 'Macedonian',
  key: 'mk',
  ISO639_3: 'mkd',
  localized_label: 'Македонски',
  translationAvailable: false },

{
  label: 'Malagasy',
  key: 'mg',
  ISO639_3: 'mlg',
  localized_label: 'Malagasy',
  translationAvailable: false },

{
  label: 'Malay',
  key: 'ms',
  ISO639_3: 'msa',
  localized_label: 'Melayu',
  translationAvailable: false },

{
  label: 'Malayalam',
  key: 'ml',
  ISO639_3: 'mal',
  localized_label: 'മലയാളം',
  translationAvailable: false },

{
  label: 'Maltese',
  key: 'mt',
  ISO639_3: 'mlt',
  localized_label: 'Malti',
  translationAvailable: false },

{
  label: 'Maori',
  key: 'mi',
  ISO639_3: 'mri',
  localized_label: 'Te reo Māori',
  translationAvailable: false },

{
  label: 'Marathi',
  key: 'mr',
  ISO639_3: 'mar',
  localized_label: 'मराठी',
  translationAvailable: false },

{
  label: 'Marshallese',
  key: 'mh',
  ISO639_3: 'mah',
  localized_label: 'Marshallese',
  translationAvailable: false },

{
  label: 'Mongolian',
  key: 'mn',
  ISO639_3: 'mon',
  localized_label: 'Монгол',
  translationAvailable: false },

{
  label: 'Nauru',
  key: 'na',
  ISO639_3: 'nau',
  localized_label: 'Nauru',
  translationAvailable: false },

{
  label: 'Navajo',
  key: 'nv',
  ISO639_3: 'nav',
  localized_label: 'Navajo',
  translationAvailable: false },

{
  label: 'Ndonga',
  key: 'ng',
  ISO639_3: 'ndo',
  localized_label: 'Ndonga',
  translationAvailable: false },

{
  label: 'Northern Ndebele',
  key: 'nd',
  ISO639_3: 'nde',
  localized_label: 'IsiNdebele',
  translationAvailable: false },

{
  label: 'Nepali',
  key: 'ne',
  ISO639_3: 'nep',
  localized_label: 'नेपाली',
  translationAvailable: false },

{
  label: 'Norwegian',
  key: 'no',
  ISO639_3: 'nor',
  localized_label: 'Norsk',
  translationAvailable: false },

{
  label: 'Norwegian bokmål',
  key: 'nb',
  ISO639_3: 'nob',
  localized_label: 'Norsk bokmål',
  translationAvailable: false },

{
  label: 'Norwegian nynorsk',
  key: 'nn',
  ISO639_3: 'nno',
  localized_label: 'Norsk nynorsk',
  translationAvailable: false },

{
  label: 'Occitan',
  key: 'oc',
  ISO639_3: 'oci',
  localized_label: 'Occitan',
  translationAvailable: false },

{
  label: 'Ojibwe',
  key: 'oj',
  ISO639_3: 'oji',
  localized_label: 'Ojibwa',
  translationAvailable: false },

{
  label: 'Old Church Slavonic, Old Bulgarian',
  key: 'cu',
  ISO639_3: 'chu',
  localized_label: 'Church Slavic',
  translationAvailable: false },

{
  label: 'Oriya',
  key: 'or',
  ISO639_3: 'ori',
  localized_label: 'ଓଡ଼ିଆ',
  translationAvailable: false },

{
  label: 'Oromo (Afaan Oromo)',
  key: 'om',
  ISO639_3: 'orm',
  localized_label: 'Oromoo',
  translationAvailable: false },

{
  label: 'Ossetian',
  key: 'os',
  ISO639_3: 'oss',
  localized_label: 'Ирон',
  translationAvailable: false },

{
  label: 'Pāli',
  key: 'pi',
  ISO639_3: 'pli',
  localized_label: 'Pali',
  translationAvailable: false },

{
  label: 'Pashto, Pushto',
  key: 'ps',
  rtl: true,
  ISO639_3: 'pus',
  localized_label: 'پښتو',
  translationAvailable: false },

{
  label: 'Persian (Farsi)',
  key: 'fa',
  rtl: true,
  ISO639_3: 'fas',
  localized_label: 'فارسی',
  translationAvailable: false },

{
  label: 'Polish',
  key: 'pl',
  ISO639_3: 'pol',
  localized_label: 'Polski',
  translationAvailable: false },

{
  label: 'Portuguese',
  key: 'pt',
  ISO639_3: 'por',
  localized_label: 'Português',
  translationAvailable: false },

{
  label: 'Punjabi (Eastern)',
  key: 'pa',
  ISO639_3: 'pan',
  localized_label: 'ਪੰਜਾਬੀ',
  translationAvailable: false },

{
  label: 'Quechua',
  key: 'qu',
  ISO639_3: 'que',
  localized_label: 'Runasimi',
  translationAvailable: false },

{
  label: 'Romansh',
  key: 'rm',
  ISO639_3: 'roh',
  localized_label: 'Rumantsch',
  translationAvailable: false },

{
  label: 'Romanian/Moldavian',
  key: 'ro',
  ISO639_3: 'ron',
  localized_label: 'Română',
  translationAvailable: false },

{
  label: 'Russian',
  key: 'ru',
  ISO639_3: 'rus',
  localized_label: 'Русский',
  translationAvailable: true },

{
  label: 'Sami',
  key: 'se',
  ISO639_3: 'sme',
  localized_label: 'Davvisámegiella',
  translationAvailable: false },

{
  label: 'Samoan',
  key: 'sm',
  ISO639_3: 'smo',
  localized_label: 'Samoan',
  translationAvailable: false },

{
  label: 'Sango',
  key: 'sg',
  ISO639_3: 'sag',
  localized_label: 'Sängö',
  translationAvailable: false },

{
  label: 'Sanskrit',
  key: 'sa',
  ISO639_3: 'san',
  localized_label: 'संस्कृत भाषा',
  translationAvailable: false },

{
  label: 'Serbian',
  key: 'sr',
  ISO639_3: 'srp',
  localized_label: 'Српски',
  translationAvailable: false },

{
  label: 'Serbo-Croatian',
  key: 'sh',
  ISO639_3: 'hbs',
  localized_label: 'Srpski (latinica)',
  translationAvailable: false },

{
  label: 'Sesotho',
  key: 'st',
  ISO639_3: 'sot',
  localized_label: 'Southern Sotho',
  translationAvailable: false },

{
  label: 'Setswana',
  key: 'tn',
  ISO639_3: 'tsn',
  localized_label: 'Tswana',
  translationAvailable: false },

{
  label: 'Shona',
  key: 'sn',
  ISO639_3: 'sna',
  localized_label: 'ChiShona',
  translationAvailable: false },

{
  label: 'Sichuan Yi, Nuosu',
  key: 'ii',
  ISO639_3: 'iii',
  localized_label: 'ꆈꌠꉙ',
  translationAvailable: false },

{
  label: 'Sindhi',
  key: 'sd',
  ISO639_3: 'snd',
  localized_label: 'سنڌي',
  translationAvailable: false },

{
  label: 'Sinhalese',
  key: 'si',
  ISO639_3: 'sin',
  localized_label: 'සිංහල',
  translationAvailable: false },

{
  label: 'Siswati, Swati',
  key: 'ss',
  ISO639_3: 'ssw',
  localized_label: 'Swati',
  translationAvailable: false },

{
  label: 'Slovak',
  key: 'sk',
  ISO639_3: 'slk',
  localized_label: 'Slovenčina',
  translationAvailable: false },

{
  label: 'Slovenian',
  key: 'sl',
  ISO639_3: 'slv',
  localized_label: 'Slovenščina',
  translationAvailable: false },

{
  label: 'Somali',
  key: 'so',
  ISO639_3: 'som',
  localized_label: 'Soomaali',
  translationAvailable: false },

{
  label: 'Southern Ndebele',
  key: 'nr',
  ISO639_3: 'nbl',
  localized_label: 'South Ndebele',
  translationAvailable: false },

{
  label: 'Spanish',
  key: 'es',
  ISO639_3: 'spa',
  localized_label: 'Español',
  translationAvailable: true },

{
  label: 'Sundanese',
  key: 'su',
  ISO639_3: 'sun',
  localized_label: 'Basa Sunda',
  translationAvailable: false },

{
  label: 'Swahili (Kiswahili)',
  key: 'sw',
  ISO639_3: 'swa',
  localized_label: 'Kiswahili',
  translationAvailable: false },

{
  label: 'Swedish',
  key: 'sv',
  ISO639_3: 'swe',
  localized_label: 'Svenska',
  translationAvailable: false },

{
  label: 'Tagalog',
  key: 'tl',
  ISO639_3: 'tgl',
  localized_label: 'Filipino',
  translationAvailable: false },

{
  label: 'Tahitian',
  key: 'ty',
  ISO639_3: 'tah',
  localized_label: 'Tahitian',
  translationAvailable: false },

{
  label: 'Tajik',
  key: 'tg',
  ISO639_3: 'tgk',
  localized_label: 'Тоҷикӣ',
  translationAvailable: false },

{
  label: 'Tamil',
  key: 'ta',
  ISO639_3: 'tam',
  localized_label: 'தமிழ்',
  translationAvailable: false },

{
  label: 'Tatar',
  key: 'tt',
  ISO639_3: 'tat',
  localized_label: 'Татар',
  translationAvailable: false },

{
  label: 'Telugu',
  key: 'te',
  ISO639_3: 'tel',
  localized_label: 'తెలుగు',
  translationAvailable: false },

{
  label: 'Thai',
  key: 'th',
  ISO639_3: 'tha',
  localized_label: 'ไทย',
  translationAvailable: true },

{
  label: 'Tibetan',
  key: 'bo',
  ISO639_3: 'bod',
  localized_label: 'བོད་སྐད་',
  translationAvailable: false },

{
  label: 'Tigrinya',
  key: 'ti',
  ISO639_3: 'tir',
  localized_label: 'ትግርኛ',
  translationAvailable: false },

{
  label: 'Tonga',
  key: 'to',
  ISO639_3: 'ton',
  localized_label: 'Lea fakatonga',
  translationAvailable: false },

{
  label: 'Tsonga',
  key: 'ts',
  ISO639_3: 'tso',
  localized_label: 'Tsonga',
  translationAvailable: false },

{
  label: 'Turkish',
  key: 'tr',
  ISO639_3: 'tur',
  localized_label: 'Türkçe',
  translationAvailable: false },

{
  label: 'Turkmen',
  key: 'tk',
  ISO639_3: 'tuk',
  localized_label: 'Türkmen dili',
  translationAvailable: false },

{
  label: 'Twi',
  key: 'tw',
  ISO639_3: 'twi',
  localized_label: 'Akan',
  translationAvailable: false },

{
  label: 'Uyghur',
  key: 'ug',
  ISO639_3: 'uig',
  localized_label: 'ئۇيغۇرچە',
  translationAvailable: false },

{
  label: 'Ukrainian',
  key: 'uk',
  ISO639_3: 'ukr',
  localized_label: 'Українська',
  translationAvailable: false },

{
  label: 'Urdu',
  key: 'ur',
  rtl: true,
  ISO639_3: 'urd',
  localized_label: 'اردو',
  translationAvailable: false },

{
  label: 'Uzbek',
  key: 'uz',
  ISO639_3: 'uzb',
  localized_label: 'O‘zbek',
  translationAvailable: false },

{
  label: 'Venda',
  key: 've',
  ISO639_3: 'ven',
  localized_label: 'Venda',
  translationAvailable: false },

{
  label: 'Vietnamese',
  key: 'vi',
  ISO639_3: 'vie',
  localized_label: 'Tiếng Việt',
  translationAvailable: false },

{
  label: 'Volapük',
  key: 'vo',
  ISO639_3: 'vol',
  localized_label: 'Volapük',
  translationAvailable: false },

{
  label: 'Wallon',
  key: 'wa',
  ISO639_3: 'wln',
  localized_label: 'Walloon',
  translationAvailable: false },

{
  label: 'Welsh',
  key: 'cy',
  ISO639_3: 'cym',
  localized_label: 'Cymraeg',
  translationAvailable: false },

{
  label: 'Wolof',
  key: 'wo',
  ISO639_3: 'wol',
  localized_label: 'Wolof',
  translationAvailable: false },

{
  label: 'Western Frisian',
  key: 'fy',
  ISO639_3: 'fry',
  localized_label: 'Frysk',
  translationAvailable: false },

{
  label: 'Xhosa',
  key: 'xh',
  ISO639_3: 'xho',
  localized_label: 'IsiXhosa',
  translationAvailable: false },

{
  label: 'Yiddish',
  key: 'yi',
  rtl: true,
  ISO639_3: 'yid',
  localized_label: 'ייִדיש',
  translationAvailable: false },

{
  label: 'Yoruba',
  key: 'yo',
  ISO639_3: 'yor',
  localized_label: 'Èdè Yorùbá',
  translationAvailable: false },

{
  label: 'Zhuang, Chuang',
  key: 'za',
  ISO639_3: 'zha',
  localized_label: 'Zhuang',
  translationAvailable: false },

{
  label: 'Zulu',
  key: 'zu',
  ISO639_3: 'zul',
  localized_label: 'IsiZulu',
  translationAvailable: false }];exports.availableLanguages = availableLanguages;



const language = (key, purpose = 'elastic') => {
  const defaultValue = purpose !== 'ISO639_1' ? 'other' : null;
  return elasticLanguages[key] ? elasticLanguages[key][purpose] : defaultValue;
};exports.language = language;