/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TagInfo {
  khmer: string;
  standard: string;
  purpose: string;
  syntax: string;
  example: string;
  mistakes: string;
  practices: string;
  category: string;
}

export interface ValidationError {
  line: number;
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
}

export interface StarterTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  validate: (html: string) => { success: boolean; hint?: string };
}

// 1. Tag Mappings
export const TAG_MAP: Record<string, string> = {
  "ទំព័រ": "html",
  "ក្បាល": "head",
  "ចំណងជើងទំព័រ": "title",
  "តួសេចក្តី": "body",
  "ចំណងជើងធំ": "h1",
  "ចំណងជើងរង": "h2",
  "ល្បះ": "p",
  "ចុះបន្ទាត់": "br",
  "បន្ទាត់កាត់": "hr",
  "អក្សរដិត": "strong",
  "អក្សរទ្រេត": "em",
  "តំណភ្ជាប់": "a",
  "រូបភាព": "img",
  "វីដេអូ": "video",
  "សំឡេង": "audio",
  "បញ្ជីគ្មានលំដាប់": "ul",
  "បញ្ជីមានលំដាប់": "ol",
  "ធាតុបញ្ជី": "li",
  "តារាង": "table",
  "ជួរដេក": "tr",
  "ក្បាលតារាង": "th",
  "ទិន្នន័យតារាង": "td",
  "ទម្រង់": "form",
  "ប្រអប់បញ្ចូល": "input",
  "ប៊ូតុង": "button",
  "ប្រអប់អត្ថបទ": "textarea",
  "ប្លុក": "div",
  "កំប៉ិកកំប៉ុក": "span"
};

// Reverse Tag Map for HTML-to-Khmer conversion if requested
export const REVERSE_TAG_MAP: Record<string, string> = Object.entries(TAG_MAP).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {} as Record<string, string>);

// 2. Attribute Mappings
export const ATTRIBUTE_MAP: Record<string, string> = {
  "អាសយដ្ឋាន": "href",
  "ប្រភព": "src",
  "ជំនួស": "alt",
  "ទទឹង": "width",
  "កម្ពស់": "height",
  "ថ្នាក់": "class",
  "លេខសម្គាល់": "id",
  "ប្រភេទ": "type",
  "តម្លៃ": "value",
  "ឈ្មោះ": "name",
  "ពណ៌": "color"
};

export const REVERSE_ATTRIBUTE_MAP: Record<string, string> = Object.entries(ATTRIBUTE_MAP).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {} as Record<string, string>);

export const SELF_CLOSING_TAGS = ["br", "hr", "img", "input", "ចុះបន្ទាត់", "បន្ទាត់កាត់", "រូបភាព", "ប្រអប់បញ្ចូល"];

// 3. Tag Documentation
export const TAG_DOCS: Record<string, TagInfo> = {
  "ទំព័រ": {
    khmer: "ទំព័រ",
    standard: "html",
    purpose: "ជាស្លាកគ្រឹះចម្បងដែលព័ទ្ធជុំវិញកូដ HTML ទាំងអស់លើគេហទំព័រ។",
    syntax: "<ទំព័រ>\n  ...\n</ទំព័រ>",
    example: "<ទំព័រ>\n  <!-- កូដផ្សេងៗទៀតនៅទីនេះ -->\n</ទំព័រ>",
    mistakes: "ភ្លេចដាក់ស្លាកបិទ </ទំព័រ> នៅចុងបញ្ចប់នៃឯកសារ។",
    practices: "ត្រូវប្រាកដថាកូដទាំងអស់របស់គេហទំព័រគឺស្ថិតនៅក្នុងស្លាក <ទំព័រ> នេះជានិច្ច។",
    category: "រចនាសម្ព័ន្ធឯកសារ"
  },
  "ក្បាល": {
    khmer: "ក្បាល",
    standard: "head",
    purpose: "ផ្ទុកព័ត៌មានបច្ចេកទេសរបស់គេហទំព័រ (Metadata) ដូចជាចំណងជើង និងទិន្នន័យផ្សេងៗដែលមិនបង្ហាញលើផ្ទៃគេហទំព័រផ្ទាល់។",
    syntax: "<ក្បាល>\n  ...\n</ក្បាល>",
    example: "<ក្បាល>\n  <ចំណងជើងទំព័រ>គេហទំព័រដំបូងរបស់ខ្ញុំ</ចំណងជើងទំព័រ>\n</ក្បាល>",
    mistakes: "ដាក់ស្លាកសម្រាប់បង្ហាញរូបភាព ឬអត្ថបទធំៗក្នុងស្លាក <ក្បាល>។",
    practices: "ប្រើសម្រាប់តែព័ត៌មានជំនួយ និងការកំណត់ផ្សេងៗ (Metadata) ដូចជាស្ទីល (CSS) ឬ ចំណងជើងទំព័រ។",
    category: "រចនាសម្ព័ន្ធឯកសារ"
  },
  "ចំណងជើងទំព័រ": {
    khmer: "ចំណងជើងទំព័រ",
    standard: "title",
    purpose: "កំណត់ចំណងជើងដែលត្រូវបង្ហាញនៅលើ Tab របស់កម្មវិធីរុករក (Web Browser)។",
    syntax: "<ចំណងជើងទំព័រ>អត្ថបទចំណងជើង</ចំណងជើងទំព័រ>",
    example: "<ចំណងជើងទំព័រ>ស្វាគមន៍មកកាន់ KhmerHTML</ចំណងជើងទំព័រ>",
    mistakes: "សរសេរក្រៅស្លាក <ក្បាល> ឬដាក់កូដ HTML ផ្សេងទៀតនៅខាងក្នុងវា។",
    practices: "សរសេរចំណងជើងខ្លី ខ្លឹមសារច្បាស់លាស់ និងទាក់ទាញដើម្បីឱ្យងាយស្រួលស្វែងរក។",
    category: "រចនាសម្ព័ន្ធឯកសារ"
  },
  "តួសេចក្តី": {
    khmer: "តួសេចក្តី",
    standard: "body",
    purpose: "ផ្ទុកមាតិកាទាំងអស់ដែលត្រូវបង្ហាញនៅលើគេហទំព័រ ដូចជា អត្ថបទ រូបភាព ប៊ូតុង និងតារាង។",
    syntax: "<តួសេចក្តី>\n  ...\n</តួសេចក្តី>",
    example: "<តួសេចក្តី>\n  <ចំណងជើងធំ>សួស្តីពិភពលោក!</ចំណងជើងធំ>\n</តួសេចក្តី>",
    mistakes: "មានស្លាក <តួសេចក្តី> ច្រើនជាងមួយនៅក្នុងទំព័រតែមួយ។",
    practices: "មាតិកាបង្ហាញទាំងអស់ត្រូវសរសេរនៅក្នុងស្លាក <តួសេចក្តី> នេះ។",
    category: "រចនាសម្ព័ន្ធឯកសារ"
  },
  "ចំណងជើងធំ": {
    khmer: "ចំណងជើងធំ",
    standard: "h1",
    purpose: "បង្ហាញចំណងជើងសំខាន់បំផុត និងមានទំហំធំជាងគេនៅលើទំព័រ (Heading 1)។",
    syntax: "<ចំណងជើងធំ>អត្ថបទចំណងជើង</ចំណងជើងធំ>",
    example: "<ចំណងជើងធំ>មេរៀនទី ១៖ ការសរសេរគេហទំព័រ</ចំណងជើងធំ>",
    mistakes: "ប្រើ <ចំណងជើងធំ> ច្រើនដងហួសហេតុនៅលើទំព័រតែមួយ ដែលនាំឱ្យប៉ះពាល់ដល់ការស្វែងរករបស់ Google (SEO)។",
    practices: "ប្រើត្រឹមតែមួយគត់នៅលើទំព័រនីមួយៗសម្រាប់ចំណងជើងចម្បង។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "ចំណងជើងរង": {
    khmer: "ចំណងជើងរង",
    standard: "h2",
    purpose: "បង្ហាញចំណងជើងរង ឬផ្នែករងសំខាន់ៗបន្ទាប់ពីចំណងជើងធំ (Heading 2)។",
    syntax: "<ចំណងជើងរង>អត្ថបទចំណងជើងរង</ចំណងជើងរង>",
    example: "<ចំណងជើងរង>ផ្នែកទី ១.១៖ អំពី HTML</ចំណងជើងរង>",
    mistakes: "ប្រើស្លាកចំណងជើងដើម្បីគ្រាន់តែធ្វើឱ្យអក្សរធំ (គួរប្រើថ្នាក់ CSS ជំនួសវិញ)។",
    practices: "ប្រើដើម្បីបែងចែកជំពូក ឬផ្នែកធំៗនៃមាតិកាទំព័រ។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "ល្បះ": {
    khmer: "ល្បះ",
    standard: "p",
    purpose: "ប្រើសម្រាប់សរសេរកថាខណ្ឌ ឬល្បះអត្ថបទធម្មតា។ វានឹងចុះបន្ទាត់ស្វ័យប្រវត្តិមុន និងក្រោយពេលបង្ហាញ។",
    syntax: "<ល្បះ>អត្ថបទសេចក្តីលម្អិត...</ល្បះ>",
    example: "<ល្បះ>នេះគឺជាគេហទំព័រដែលសរសេរឡើងដោយភាសាខ្មែរដំបូងបង្អស់។</ល្បះ>",
    mistakes: "ដាក់ស្លាកប្រភេទប្លុកធំៗ ដូចជា <តារាង> ឬ <ទម្រង់> នៅខាងក្នុងស្លាក <ល្បះ>។",
    practices: "ប្រើសម្រាប់រាល់ការបង្ហាញអត្ថបទធម្មតា ដើម្បីងាយស្រួលគ្រប់គ្រងគម្លាត (Padding/Margin)។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "ចុះបន្ទាត់": {
    khmer: "ចុះបន្ទាត់",
    standard: "br",
    purpose: "បង្ខំឱ្យអត្ថបទចុះទៅបន្ទាត់ថ្មី (Line Break) ដោយមិនបង្កើតកថាខណ្ឌថ្មី។",
    syntax: "<ចុះបន្ទាត់ /> ឬ <ចុះបន្ទាត់>",
    example: "បន្ទាត់ទីមួយ<ចុះបន្ទាត់ />បន្ទាត់ទីពីរ",
    mistakes: "ប្រើស្លាក <ចុះបន្ទាត់> ច្រើនដងជាប់ៗគ្នាដើម្បីបង្កើតគម្លាតទទេធំៗ (គួរប្រើ Margin ក្នុង CSS)។",
    practices: "ប្រើសម្រាប់ការសរសេរកំណាព្យ អាសយដ្ឋាន ឬអត្ថបទខ្លីៗដែលត្រូវការបង្ខំចុះបន្ទាត់។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "បន្ទាត់កាត់": {
    khmer: "បន្ទាត់កាត់",
    standard: "hr",
    purpose: "គូសបន្ទាត់ផ្តេកមួយកាត់ទទឹងទំព័រដើម្បីបែងចែកផ្នែកមាតិកា។",
    syntax: "<បន្ទាត់កាត់ /> ឬ <បន្ទាត់កាត់>",
    example: "<ល្បះ>ផ្នែកខាងលើ</ល្បះ>\n<បន្ទាត់កាត់ />\n<ល្បះ>ផ្នែកខាងក្រោម</ល្បះ>",
    mistakes: "ប្រើដើម្បីគ្រាន់តែតុបតែងគេហទំព័រដោយគ្មានអត្ថន័យបែងចែកផ្នែក។",
    practices: "ប្រើប្រាស់នៅពេលដែលប្រធានបទនៃអត្ថបទផ្លាស់ប្តូរទៅជាផ្នែកថ្មី។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "អក្សរដិត": {
    khmer: "អក្សរដិត",
    standard: "strong",
    purpose: "ធ្វើឱ្យអត្ថបទទៅជាអក្សរដិត និងបញ្ជាក់ពីភាពសំខាន់ខ្លាំងនៃអត្ថបទនោះ។",
    syntax: "<អក្សរដិត>អត្ថបទសំខាន់</អក្សរដិត>",
    example: "ការប្រឡងនឹងចាប់ផ្តើមនៅ <អក្សរដិត>ម៉ោង ៨:០០ ព្រឹក</អក្សរដិត>។",
    mistakes: "ប្រើប្រាស់សម្រាប់តែចង់លម្អអក្សរឱ្យដិតធម្មតា (គួរប្រើ CSS font-weight)។",
    practices: "ប្រើសម្រាប់តែពាក្យ ឬប្រយោគដែលត្រូវការការយកចិត្តទុកដាក់ខ្លាំងពីអ្នកអាន។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "អក្សរទ្រេត": {
    khmer: "អក្សរទ្រេត",
    standard: "em",
    purpose: "ធ្វើឱ្យអក្សរទ្រេត និងបញ្ជាក់ពីការសង្កត់ធ្ងន់លើពាក្យ ឬប្រយោគ។",
    syntax: "<អក្សរទ្រេត>អត្ថបទទ្រេត</អក្សរទ្រេត>",
    example: "សូមប្រញាប់ឡើង យើង <អក្សរទ្រេត>យឺត</អក្សរទ្រេត> ហើយ!",
    mistakes: "ប្រើសម្រាប់រាល់អក្សរទ្រេតទាំងអស់ដែលមិនមានន័យសង្កត់ធ្ងន់ (ប្រើ CSS font-style: italic ជំនួស)។",
    practices: "ប្រើសម្រាប់ពាក្យបច្ចេកទេស ឈ្មោះសៀវភៅ ឬការសង្កត់សំឡេង។",
    category: "ចំណងជើង និងអត្ថបទ"
  },
  "តំណភ្ជាប់": {
    khmer: "តំណភ្ជាប់",
    standard: "a",
    purpose: "បង្កើតតំណភ្ជាប់ (Hyperlink) ទៅកាន់ទំព័រផ្សេងទៀតដោយប្រើគុណលក្ខណៈ \"អាសយដ្ឋាន\" (href)។",
    syntax: "<តំណភ្ជាប់ អាសយដ្ឋាន=\"តំណ_URL\">ឈ្មោះបង្ហាញ</តំណភ្ជាប់>",
    example: "<តំណភ្ជាប់ អាសយដ្ឋាន=\"https://google.com\">ស្វែងរកនៅលើ Google</តំណភ្ជាប់>",
    mistakes: "ភ្លេចដាក់គុណលក្ខណៈ អាសយដ្ឋាន (href) ដែលធ្វើឱ្យតំណភ្ជាប់មិនអាចចុចបាន។",
    practices: "បន្ថែមគុណលក្ខណៈ target=\"_blank\" ប្រសិនបើចង់ឱ្យបើកនៅលើ Tab ថ្មី។",
    category: "ប្រព័ន្ធផ្សព្វផ្សាយ និងតំណភ្ជាប់"
  },
  "រូបភាព": {
    khmer: "រូបភាព",
    standard: "img",
    purpose: "បង្ហាញរូបភាពនៅលើគេហទំព័រដោយប្រើគុណលក្ខណៈ \"ប្រភព\" (src) និង \"ជំនួស\" (alt)។",
    syntax: "<រូបភាព ប្រភព=\"ផ្លូវ_រូបភាព\" ជំនួស=\"ការពិពណ៌នា\" />",
    example: "<រូបភាព ប្រភព=\"https://images.unsplash.com/photo-1579546929518-9e396f3cc809\" ជំនួស=\"ផ្ទៃពណ៌ស្អាត\" ទទឹង=\"300\" />",
    mistakes: "ភ្លេចដាក់គុណលក្ខណៈ \"ជំនួស\" (alt) ដែលធ្វើឱ្យអ្នកប្រើប្រាស់ពិការភ្នែកមិនអាចយល់ពីខ្លឹមសាររូបភាពបាន។",
    practices: "តែងតែសរសេរ ជំនួស (alt) ឱ្យមានន័យ និងទាក់ទងនឹងរូបភាពជានិច្ច។",
    category: "ប្រព័ន្ធផ្សព្វផ្សាយ និងតំណភ្ជាប់"
  },
  "វីដេអូ": {
    khmer: "វីដេអូ",
    standard: "video",
    purpose: "ចាក់វីដេអូផ្ទាល់នៅលើគេហទំព័រ។",
    syntax: "<វីដេអូ ប្រភព=\"ផ្លូវ_វីដេអូ\" controls>\n  មិនគាំទ្រវីដេអូនេះទេ\n</វីដេអូ>",
    example: "<វីដេអូ ប្រភព=\"movie.mp4\" ទទឹង=\"320\" controls>\n  កម្មវិធីរុករករបស់អ្នកមិនគាំទ្រវីដេអូទេ។\n</វីដេអូ>",
    mistakes: "មិនដាក់គុណលក្ខណៈ controls ដែលធ្វើឱ្យវីដេអូមិនអាចបញ្ជាចាក់ ឬផ្អាកបាន។",
    practices: "តែងតែផ្តល់ជម្រើសកម្រិតបញ្ជា (controls) ដើម្បីបង្កើនបទពិសោធន៍អ្នកប្រើប្រាស់។",
    category: "ប្រព័ន្ធផ្សព្វផ្សាយ និងតំណភ្ជាប់"
  },
  "សំឡេង": {
    khmer: "សំឡេង",
    standard: "audio",
    purpose: "ចាក់ឯកសារសំឡេង ឬតន្ត្រីនៅលើគេហទំព័រ។",
    syntax: "<សំឡេង ប្រភព=\"ផ្លូវ_សំឡេង\" controls></សំឡេង>",
    example: "<សំឡេង ប្រភព=\"song.mp3\" controls></សំឡេង>",
    mistakes: "ភ្លេចដាក់គុណលក្ខណៈ controls ដែលធ្វើឱ្យមិនលេចចេញឧបករណ៍ចាក់សំឡេង។",
    practices: "ប្រើប្រាស់ទ្រង់ទ្រាយ MP3 ដែលត្រូវបានគាំទ្រលើគ្រប់កម្មវិធីរុករក។",
    category: "ប្រព័ន្ធផ្សព្វផ្សាយ និងតំណភ្ជាប់"
  },
  "បញ្ជីគ្មានលំដាប់": {
    khmer: "បញ្ជីគ្មានលំដាប់",
    standard: "ul",
    purpose: "បង្កើតបញ្ជីរាយនាមដែលមានចំណុចមូលៗ (Bullet List) នៅពីមុខ។",
    syntax: "<បញ្ជីគ្មានលំដាប់>\n  <ធាតុបញ្ជី>...</ធាតុបញ្ជី>\n</បញ្ជីគ្មានលំដាប់>",
    example: "<បញ្ជីគ្មានលំដាប់>\n  <ធាតុបញ្ជី>បាយក្ដាំង</ធាតុបញ្ជី>\n  <ធាតុបញ្ជី>ទឹកក្រូច</ធាតុបញ្ជី>\n</បញ្ជីគ្មានលំដាប់>",
    mistakes: "ដាក់អត្ថបទធម្មតា ឬស្លាកផ្សេងក្រៅពី <ធាតុបញ្ជី> (<li>) នៅក្នុងស្លាកនេះផ្ទាល់។",
    practices: "កូនៗផ្ទាល់របស់ស្លាកនេះត្រូវតែជា <ធាតុបញ្ជី> (<li>) ជានិច្ច។",
    category: "បញ្ជីរាយនាម"
  },
  "បញ្ជីមានលំដាប់": {
    khmer: "បញ្ជីមានលំដាប់",
    standard: "ol",
    purpose: "បង្កើតបញ្ជីរាយនាមដែលមានលេខរៀបតាមលំដាប់លំដោយ (Numbered List)។",
    syntax: "<បញ្ជីមានលំដាប់>\n  <ធាតុបញ្ជី>...</ធាតុបញ្ជី>\n</បញ្ជីមានលំដាប់>",
    example: "<បញ្ជីមានលំដាប់>\n  <ធាតុបញ្ជី>ជំហានទី ១</ធាតុបញ្ជី>\n  <ធាតុបញ្ជី>ជំហានទី ២</ធាតុបញ្ជី>\n</បញ្ជីមានលំដាប់>",
    mistakes: "ភ្លេចបិទស្លាកកូនៗ ឬប្រើប្រាស់មិនត្រូវតាមលំដាប់លំដោយ។",
    practices: "ស័ក្តិសមបំផុតសម្រាប់កិច្ចការដែលទាមទារលំដាប់លំដោយច្បាស់លាស់ ដូចជារូបមន្តធ្វើម្ហូបជាដើម។",
    category: "បញ្ជីរាយនាម"
  },
  "ធាតុបញ្ជី": {
    khmer: "ធាតុបញ្ជី",
    standard: "li",
    purpose: "តំណាងឱ្យធាតុនីមួយៗនៅក្នុងបញ្ជីគ្មានលំដាប់ ឬបញ្ជីមានលំដាប់។",
    syntax: "<ធាតុបញ្ជី>មាតិកាធាតុ</ធាតុបញ្ជី>",
    example: "<ធាតុបញ្ជី>ក្រូចពោធិ៍សាត់</ធាតុបញ្ជី>",
    mistakes: "សរសេរ <ធាតុបញ្ជី> នៅក្រៅស្លាកបញ្ជីចម្បង (<បញ្ជីមានលំដាប់> ឬ <បញ្ជីគ្មានលំដាប់>)។",
    practices: "ត្រូវតែសរសេរនៅខាងក្នុងស្លាកបញ្ជីមេជានិច្ច។",
    category: "បញ្ជីរាយនាម"
  },
  "តារាង": {
    khmer: "តារាង",
    standard: "table",
    purpose: "បង្កើតរចនាសម្ព័ន្ធតារាងដើម្បីបង្ហាញទិន្នន័យជាជួរដេក និងជួរឈរ។",
    syntax: "<តារាង>\n  ...\n</តារាង>",
    example: "<តារាង>\n  <ជួរដេក>\n    <ក្បាលតារាង>ឈ្មោះ</ក្បាលតារាង>\n    <ក្បាលតារាង>ពិន្ទុ</ក្បាលតារាង>\n  </ជួរដេក>\n</តារាង>",
    mistakes: "មិនប្រើប្រាស់ស្លាក <ជួរដេក> ដើម្បីគ្រប់គ្រងកោសិកាទិន្នន័យ។",
    practices: "ប្រើរួមគ្នាជាមួយស្លាក <ជួរដេក>, <ក្បាលតារាង>, និង <ទិន្នន័យតារាង>។",
    category: "តារាង"
  },
  "ជួរដេក": {
    khmer: "ជួរដេក",
    standard: "tr",
    purpose: "តំណាងឱ្យជួរដេកនីមួយៗនៅក្នុងតារាង (Table Row)។",
    syntax: "<ជួរដេក>...</ជួរដេក>",
    example: "<ជួរដេក>\n  <ទិន្នន័យតារាង>កាពីតង់</ទិន្នន័យតារាង>\n</ជួរដេក>",
    mistakes: "ដាក់ទិន្នន័យអត្ថបទដោយផ្ទាល់នៅខាងក្នុងស្លាក <ជួរដេក> ដោយមិនប្រើ <ទិន្នន័យតារាង>។",
    practices: "រាល់មាតិកាក្នុងជួរដេកត្រូវស្ថិតនៅក្នុងស្លាក <ក្បាលតារាង> ឬ <ទិន្នន័យតារាង>។",
    category: "តារាង"
  },
  "ក្បាលតារាង": {
    khmer: "ក្បាលតារាង",
    standard: "th",
    purpose: "បង្ហាញកោសិកាសម្រាប់ចំណងជើងជួរឈរក្នុងតារាង ដោយមានអក្សរដិត និងស្ថិតនៅកណ្តាល។",
    syntax: "<ក្បាលតារាង>អត្ថបទក្បាល</ក្បាលតារាង>",
    example: "<ក្បាលតារាង>លេខរៀង</ក្បាលតារាង>",
    mistakes: "ប្រើ <ទិន្នន័យតារាង> សម្រាប់ក្បាលតារាង រួចដាក់អក្សរដិតតាមក្រោយ (គួរប្រើស្លាកនេះតែម្តង)។",
    practices: "ប្រើសម្រាប់តែជួរដេកដំបូងគេបង្អស់នៃតារាងដើម្បីសម្គាល់ទិន្នន័យ។",
    category: "តារាង"
  },
  "ទិន្នន័យតារាង": {
    khmer: "ទិន្នន័យតារាង",
    standard: "td",
    purpose: "បង្ហាញកោសិកាទិន្នន័យធម្មតានៅក្នុងតារាង (Table Data)។",
    syntax: "<ទិន្នន័យតារាង>ទិន្នន័យ</ទិន្នន័យតារាង>",
    example: "<ទិន្នន័យតារាង>១០០$</ទិន្នន័យតារាង>",
    mistakes: "ចំនួនកោសិកាទិន្នន័យមិនស្មើគ្នារវាងជួរដេកនីមួយៗ នាំឱ្យតារាងខូចទ្រង់ទ្រាយ។",
    practices: "ត្រូវប្រាកដថាជួរដេកនីមួយៗមានចំនួនស្លាក <ទិន្នន័យតារាង> ស្មើៗគ្នា។",
    category: "តារាង"
  },
  "ទម្រង់": {
    khmer: "ទម្រង់",
    standard: "form",
    purpose: "បង្កើតផ្នែកមួយសម្រាប់ប្រមូលព័ត៌មានដែលបញ្ជូនដោយអ្នកប្រើប្រាស់ (Form)។",
    syntax: "<ទម្រង់>\n  ...\n</ទម្រង់>",
    example: "<ទម្រង់>\n  <ប្រអប់បញ្ចូល ប្រភេទ=\"text\" ឈ្មោះ=\"username\" />\n</ទម្រង់>",
    mistakes: "ភ្លេចដាក់ស្លាកបិទ ឬដាក់ទម្រង់មួយនៅខាងក្នុងទម្រង់មួយទៀត (ទម្រង់មិនអាចជាន់គ្នាបានទេ)។",
    practices: "ប្រើប្រាស់ដើម្បីប្រមូលមតិយោបល់ ការចុះឈ្មោះ ឬការស្វែងរកព័ត៌មាន។",
    category: "ទម្រង់បញ្ចូលទិន្នន័យ"
  },
  "ប្រអប់បញ្ចូល": {
    khmer: "ប្រអប់បញ្ចូល",
    standard: "input",
    purpose: "បង្កើតជាប្រអប់ទទេសម្រាប់ឱ្យអ្នកប្រើប្រាស់វាយបញ្ចូលព័ត៌មាន ឬជ្រើសរើសជម្រើស។",
    syntax: "<ប្រអប់បញ្ចូល ប្រភេទ=\"ប្រភេទ_បញ្ចូល\" />",
    example: "<ប្រអប់បញ្ចូល ប្រភេទ=\"text\" ជំនួស=\"បញ្ចូលឈ្មោះនៅទីនេះ\" />",
    mistakes: "ភ្លេចដាក់គុណលក្ខណៈ \"ប្រភេទ\" (type) ដែលធ្វើឱ្យវាក្លាយជាប្រអប់វាយអក្សរធម្មតាតែមួយគត់។",
    practices: "ប្រើប្រាស់គុណលក្ខណៈ ប្រភេទ=\"text\", ប្រភេទ=\"email\", ប្រភេទ=\"password\" ឬ ប្រភេទ=\"submit\" ទៅតាមតម្រូវការ។",
    category: "ទម្រង់បញ្ចូលទិន្នន័យ"
  },
  "ប៊ូតុង": {
    khmer: "ប៊ូតុង",
    standard: "button",
    purpose: "បង្កើតប៊ូតុងមួយសម្រាប់ឱ្យអ្នកប្រើប្រាស់ចុចដើម្បីបញ្ជូនទិន្នន័យ ឬដំណើរការអ្វីមួយ។",
    syntax: "<ប៊ូតុង>អត្ថបទប៊ូតុង</ប៊ូតុង>",
    example: "<ប៊ូតុង ប្រភេទ=\"submit\" ថ្នាក់=\"bg-blue-500 text-white p-2\">ចុះឈ្មោះ</ប៊ូតុង>",
    mistakes: "ប្រើស្លាក <តំណភ្ជាប់> (<a>) ដែលតុបតែងដូចប៊ូតុងជំនួសឱ្យការប្រើ <ប៊ូតុង> ពិតប្រាកដសម្រាប់ដាក់បញ្ជូនទិន្នន័យ។",
    practices: "តែងតែកំណត់គុណលក្ខណៈ ប្រភេទ=\"button\" ឬ ប្រភេទ=\"submit\" ឱ្យច្បាស់លាស់។",
    category: "ទម្រង់បញ្ចូលទិន្នន័យ"
  },
  "ប្រអប់អត្ថបទ": {
    khmer: "ប្រអប់អត្ថបទ",
    standard: "textarea",
    purpose: "បង្កើតប្រអប់សរសេរអត្ថបទខ្នាតធំ ដែលអាចឱ្យអ្នកប្រើប្រាស់សរសេរបានច្រើនបន្ទាត់ (Multi-line text input)។",
    syntax: "<ប្រអប់អត្ថបទ>...</ប្រអប់អត្ថបទ>",
    example: "<ប្រអប់អត្ថបទ ឈ្មោះ=\"message\" ជំនួស=\"សរសេរមតិយោបល់...\"></ប្រអប់អត្ថបទ>",
    mistakes: "ប្រើប្រាស់ <ប្រអប់បញ្ចូល ប្រភេទ=\"text\"> សម្រាប់សរសេរអត្ថបទវែងៗ។",
    practices: "ប្រើប្រាស់គុណលក្ខណៈ rows និង cols ដើម្បីកំណត់ទំហំប្រអប់ដំបូង។",
    category: "ទម្រង់បញ្ចូលទិន្នន័យ"
  },
  "ប្លុក": {
    khmer: "ប្លុក",
    standard: "div",
    purpose: "បង្កើតជាប្រអប់ ឬប្លុកទទេមួយសម្រាប់រៀបចំរចនាសម្ព័ន្ធប្លង់គេហទំព័រ និងងាយស្រួលតុបតែងដោយ CSS។",
    syntax: "<ប្លុក>\n  ...\n</ប្លុក>",
    example: "<ប្លុក ថ្នាក់=\"bg-gray-100 p-4 border\">\n  <ចំណងជើងរង>ព័ត៌មានថ្មីៗ</ចំណងជើងរង\n</ប្លុក>",
    mistakes: "ប្រើស្លាក <ប្លុក> ច្រើនហួសកម្រិតនៅកន្លែងដែលអាចប្រើស្លាកមានន័យជាក់លាក់ដូចជា <ក្បាល> ឬ <តួសេចក្តី>។",
    practices: "ប្រើជាជំនួយការរៀបចំ layout ដូចជា Flexbox ឬ Grid ដោយប្រើរួមគ្នាជាមួយ CSS ថ្នាក់ (class)។",
    category: "ប្លង់ និងការតុបតែង"
  },
  "កំប៉ិកកំប៉ុក": {
    khmer: "កំប៉ិកកំប៉ុក",
    standard: "span",
    purpose: "ប្រើសម្រាប់កំណត់ស្ទីល ឬការតុបតែងលើផ្នែកតូចមួយនៃអត្ថបទនៅក្នុងល្បះ ដោយមិនចុះបន្ទាត់ថ្មី។",
    syntax: "<កំប៉ិកកំប៉ុក>អត្ថបទខ្លី</កំប៉ិកកំប៉ុក>",
    example: "<ល្បះ>ខ្ញុំស្រឡាញ់ <កំប៉ិកកំប៉ុក ពណ៌=\"red\">ភាសាខ្មែរ</កំប៉ិកកំប៉ុក> ណាស់។</ល្បះ>",
    mistakes: "ប្រើដើម្បីគ្រប់គ្រងប្លុកធំៗដែលត្រូវការចុះបន្ទាត់ថ្មី។",
    practices: "ស័ក្តិសមបំផុតសម្រាប់ប្តូរពណ៌អក្សរតែមួយពាក្យ ឬពីរពាក្យនៅក្នុងកថាខណ្ឌ។",
    category: "ប្លង់ និងការតុបតែង"
  }
};

// Find closest tag for misspelled inputs
export function findClosestTag(word: string): string {
  let bestTag = "ទំព័រ";
  let minDistance = 999;
  
  for (const tag of Object.keys(TAG_MAP)) {
    const dist = levenshtein(word, tag);
    if (dist < minDistance) {
      minDistance = dist;
      bestTag = tag;
    }
  }
  return bestTag;
}

function levenshtein(a: string, b: string): number {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

// 4. Attribute Translator Helper
function translateAttributes(attrStr: string): string {
  if (!attrStr) return "";
  let resolvedStr = attrStr;
  
  for (const [khmer, eng] of Object.entries(ATTRIBUTE_MAP)) {
    // Replace khmer=" with eng=" or khmer=' with eng='
    const regexEq = new RegExp(`${khmer}(\\s*=)`, "g");
    resolvedStr = resolvedStr.replace(regexEq, `${eng}$1`);
    
    // Replace trailing space or end of tag attribute declarations
    const regexSpace = new RegExp(`(\\s)${khmer}(\\s|$)`, "g");
    resolvedStr = resolvedStr.replace(regexSpace, `$1${eng}$2`);
  }
  return resolvedStr;
}

// 5. Main Translator & Error Detection
export function translateKhmerToStandard(khmerHtml: string): { html: string; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const tagStack: { name: string; khmer: string; line: number }[] = [];
  
  const lines = khmerHtml.split("\n");
  
  function getLineNumber(index: number): number {
    let currentCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineLen = lines[i].length + 1; // +1 for newline
      if (index >= currentCount && index < currentCount + lineLen) {
        return i + 1;
      }
      currentCount += lineLen;
    }
    return lines.length;
  }

  // Regex matches < /optional tagname attribute_string /optional >
  const tagRegex = /<(\/)?([^>\s/]+)([^>]*?)(\/)?>/g;
  
  const html = khmerHtml.replace(tagRegex, (match, isClosing, tagName, attrStr, isSelfClosing, index) => {
    const line = getLineNumber(index);
    const standardTag = TAG_MAP[tagName];
    const isStandard = Object.values(TAG_MAP).includes(tagName);

    if (!standardTag && !isStandard && !tagName.startsWith("!") && !tagName.startsWith("?")) {
      if (/[\u1780-\u17FF]/.test(tagName)) {
        errors.push({
          line,
          severity: "error",
          message: `រកមិនឃើញស្លាកខ្មែរ "${tagName}" ទេ។`,
          suggestion: `តើអ្នកចង់សរសេរ "<${findClosestTag(tagName)}>" មែនទេ?`
        });
      }
    }

    const resolvedTagName = standardTag || tagName;
    const isSelf = SELF_CLOSING_TAGS.includes(resolvedTagName);

    if (!tagName.startsWith("!") && !tagName.startsWith("?")) {
      if (isClosing) {
        if (tagStack.length === 0) {
          errors.push({
            line,
            severity: "error",
            message: `រកឃើញស្លាកបិទ </${tagName}> ដោយគ្មានស្លាកបើក។`,
            suggestion: `លុប </${tagName}> នេះចេញ ឬបន្ថែមស្លាកបើក <${tagName}> នៅផ្នែកខាងលើ។`
          });
        } else {
          const last = tagStack.pop();
          if (last && last.name !== resolvedTagName) {
            errors.push({
              line,
              severity: "warning",
              message: `រៀបចំស្លាកខុសលំដាប់៖ បានបិទ </${tagName}> ប៉ុន្តែស្លាកដែលត្រូវបិទមុនគេគឺ </${last.khmer}>។`,
              suggestion: `សូមបិទស្លាក <${last.khmer}> សិន រួចសឹមបិទស្លាក <${tagName}> តាមក្រោយ។`
            });
            // Put it back to keep tracking
            tagStack.push(last);
          }
        }
      } else if (!isSelf && !isSelfClosing) {
        tagStack.push({ name: resolvedTagName, khmer: tagName, line });
      }
    }

    // Check critical attributes
    if (resolvedTagName === "img" || resolvedTagName === "រូបភាព") {
      if (!attrStr.includes("ប្រភព") && !attrStr.includes("src")) {
        errors.push({
          line,
          severity: "warning",
          message: `ស្លាក <រូបភាព> ត្រូវការគុណលក្ខណៈ "ប្រភព" (src) ដើម្បីបង្ហាញរូបភាព។`,
          suggestion: `បន្ថែម ប្រភព="តំណរូបភាព"`
        });
      }
    }
    if (resolvedTagName === "a" || resolvedTagName === "តំណភ្ជាប់") {
      if (!attrStr.includes("អាសយដ្ឋាន") && !attrStr.includes("href")) {
        errors.push({
          line,
          severity: "warning",
          message: `ស្លាក <តំណភ្ជាប់> ត្រូវការគុណលក្ខណៈ "អាសយដ្ឋាន" (href) ដើម្បីបង្កើតតំណភ្ជាប់។`,
          suggestion: `បន្ថែម អាសយដ្ឋាន="តំណភ្ជាប់"`
        });
      }
    }

    // Translate attributes within this tag
    const resolvedAttrs = translateAttributes(attrStr);
    const slash = isSelfClosing ? " /" : "";
    return `<${isClosing ? "/" : ""}${resolvedTagName}${resolvedAttrs}${slash}>`;
  });

  // Remaining unclosed tags
  while (tagStack.length > 0) {
    const unclosed = tagStack.pop();
    if (unclosed) {
      errors.push({
        line: unclosed.line,
        severity: "error",
        message: `ស្លាក <${unclosed.khmer}> មិនទាន់បានបិទត្រឹមត្រូវទេ។`,
        suggestion: `សូមបន្ថែមស្លាកបិទ </${unclosed.khmer}> នៅចុងបញ្ចប់នៃកូដ។`
      });
    }
  }

  return { html, errors };
}

// 6. DOM Tree Builder
export interface DOMNode {
  name: string;
  isKhmer: boolean;
  children: DOMNode[];
}

export function parseDOMTree(khmerHtml: string): DOMNode[] {
  const rootNodes: DOMNode[] = [];
  const stack: DOMNode[] = [];
  
  // Clean comments
  const cleanHtml = khmerHtml.replace(/<!--[\s\S]*?-->/g, "");
  
  // Match tags and text
  const tagRegex = /<(\/)?([^>\s/]+)([^>]*?)(\/)?>/g;
  let match;
  
  while ((match = tagRegex.exec(cleanHtml)) !== null) {
    const isClosing = !!match[1];
    const tagName = match[2];
    const isSelfClosing = !!match[4] || SELF_CLOSING_TAGS.includes(TAG_MAP[tagName] || tagName);
    
    if (tagName.startsWith("!") || tagName.startsWith("?")) {
      continue;
    }

    const isKhmer = !!TAG_MAP[tagName];

    if (isClosing) {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      const newNode: DOMNode = {
        name: tagName,
        isKhmer,
        children: []
      };

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(newNode);
      } else {
        rootNodes.push(newNode);
      }

      if (!isSelfClosing) {
        stack.push(newNode);
      }
    }
  }
  
  return rootNodes;
}

// 7. Starter Templates
export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "portfolio",
    title: "គេហទំព័រប្រវត្តិរូប (Portfolio)",
    description: "គេហទំព័រប្រវត្តិរូបផ្ទាល់ខ្លួនដែលមានការស្វាគមន៍ រូបថត និងការណែនាំពីខ្លួនឯងយ៉ាងស្រស់ស្អាត។",
    category: "ប្រវត្តិរូប",
    code: `<ទំព័រ>
  <ក្បាល>
    <ចំណងជើងទំព័រ>ប្រវត្តិរូបរបស់ខ្ញុំ</ចំណងជើងទំព័រ
  </ក្បាល>
  <តួសេចក្តី>
    <ប្លុក ថ្នាក់="max-w-xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <ប្លុក ថ្នាក់="text-center">
        <រូបភាព ប្រភព="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" ជំនួស="រូបថតរបស់ខ្ញុំ" ថ្នាក់="w-32 h-32 mx-auto rounded-full border-4 border-amber-500 object-cover shadow-md" />
        <ចំណងជើងធំ ថ្នាក់="text-3xl font-bold mt-4 text-gray-800">ណារី ម៉ៅ</ចំណងជើងធំ>
        <ល្បះ ថ្នាក់="text-amber-600 font-medium text-lg">អ្នករចនាគេហទំព័រវ័យក្មេង</ល្បះ>
      </ប្លុក>

      <បន្ទាត់កាត់ ថ្នាក់="my-6 border-gray-200" />

      <ចំណងជើងរង ថ្នាក់="text-xl font-bold text-gray-800 mb-2">អំពីខ្ញុំ</ចំណងជើងរង>
      <ល្បះ ថ្នាក់="text-gray-600 leading-relaxed mb-4">
        សួស្តី! ខ្ញុំជានិស្សិតផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ។ ខ្ញុំចូលចិត្តបង្កើតគេហទំព័រស្អាតៗ និងរៀនបច្ចេកវិទ្យាថ្មីៗ។ នេះជាគេហទំព័រខ្មែរដំបូងបង្អស់របស់ខ្ញុំ!
      </ល្បះ>

      <ចំណងជើងរង ថ្នាក់="text-xl font-bold text-gray-800 mb-2">ជំនាញរបស់ខ្ញុំ</ចំណងជើងរង>
      <បញ្ជីគ្មានលំដាប់ ថ្នាក់="list-disc pl-5 text-gray-600 space-y-1 mb-6">
        <ធាតុបញ្ជី>ការរចនាគេហទំព័រ (HTML, CSS)</ធាតុបញ្ជី>
        <ធាតុបញ្ជី>ការថតរូប និងកាត់តវីដេអូ</ធាតុបញ្ជី>
        <ធាតុបញ្ជី>ភាសាខ្មែរ និងអង់គ្លេស</ធាតុបញ្ជី>
      </បញ្ជីគ្មានលំដាប់>

      <ប្លុក ថ្នាក់="text-center">
        <តំណភ្ជាប់ អាសយដ្ឋាន="https://t.me/telegram" ថ្នាក់="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition shadow-md">
          ទំនាក់ទំនងខ្ញុំ
        </តំណភ្ជាប់>
      </ប្លុក>
    </ប្លុក>
  </តួសេចក្តី>
</ទំព័រ>`
  },
  {
    id: "restaurant",
    title: "ហាងអាហាររសជាតិខ្មែរ",
    description: "ទំព័រមុខម្ហូប និងម៉ឺនុយហាងអាហារខ្មែរ រួមជាមួយរូបភាព និងតារាងតម្លៃគួរឱ្យចង់ញ៉ាំ។",
    category: "អាជីវកម្ម",
    code: `<ទំព័រ>
  <ក្បាល>
    <ចំណងជើងទំព័រ>អាហារដ្ឋាន រសជាតិខ្មែរ</ចំណងជើងទំព័រ
  </ក្បាល>
  <តួសេចក្តី>
    <ប្លុក ថ្នាក់="max-w-2xl mx-auto my-10 p-8 bg-orange-50 rounded-3xl shadow-xl border border-orange-100 text-gray-800">
      <ប្លុក ថ្នាក់="text-center mb-8">
        <ចំណងជើងធំ ថ្នាក់="text-4xl font-extrabold text-orange-600 tracking-tight">អាហារដ្ឋាន រសជាតិខ្មែរ</ចំណងជើងធំ>
        <ល្បះ ថ្នាក់="text-gray-500 italic mt-1">«រសជាតិពិតៗពីស្រុកស្រែចម្ការ»</ល្បះ>
      </ប្លុក>

      <រូបភាព ប្រភព="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600" ជំនួស="ម្ហូបខ្មែរ" ថ្នាក់="w-full h-64 object-cover rounded-2xl shadow-md mb-8" />

      <ចំណងជើងរង ថ្នាក់="text-2xl font-bold text-orange-600 mb-4 border-b pb-2">ម៉ឺនុយពិសេសប្រចាំថ្ងៃ</ចំណងជើងរង>
      
      <តារាង ថ្នាក់="w-full text-left mb-8">
        <ជួរដេក ថ្នាក់="border-b border-orange-200">
          <ក្បាលតារាង ថ្នាក់="py-2 text-orange-700">មុខម្ហូប</ក្បាលតារាង>
          <ក្បាលតារាង ថ្នាក់="py-2 text-orange-700 text-right">តម្លៃ</ក្បាលតារាង>
        </ជួរដេក>
        <ជួរដេក ថ្នាក់="border-b border-orange-100">
          <ទិន្នន័យតារាង ថ្នាក់="py-3 font-medium">សម្លម្ជូរគ្រឿងសាច់គោ</ទិន្នន័យតារាង>
          <ទិន្នន័យតារាង ថ្នាក់="py-3 text-right text-orange-600 font-bold">១៥,០០០ រៀល</ទិន្នន័យតារាង>
        </ជួរដេក>
        <ជួរដេក ថ្នាក់="border-b border-orange-100">
          <ទិន្នន័យតារាង ថ្នាក់="py-3 font-medium">អាម៉ុកត្រីអន្លក់ខ្មែរ</ទិន្នន័យតារាង>
          <ទិន្នន័យតារាង ថ្នាក់="py-3 text-right text-orange-600 font-bold">១៨,០០០ រៀល</ទិន្នន័យតារាង>
        </ជួរដេក>
        <ជួរដេក ថ្នាក់="border-b border-orange-100">
          <ទិន្នន័យតារាង ថ្នាក់="py-3 font-medium">បាយឆាសាច់ជ្រូកបំពង</ទិន្នន័យតារាង>
          <ទិន្នន័យតារាង ថ្នាក់="py-3 text-right text-orange-600 font-bold">១២,០០០ រៀល</ទិន្នន័យតារាង>
        </ជួរដេក>
      </តារាង>

      <ប្លុក ថ្នាក់="bg-orange-100 p-4 rounded-xl text-center">
        <ល្បះ ថ្នាក់="text-orange-800 font-medium">
          បើកលក់រៀងរាល់ថ្ងៃ ចាប់ពីម៉ោង ៧:០០ ព្រឹក ដល់ ៩:០០ យប់
        </ល្បះ>
      </ប្លុក>
    </ប្លុក>
  </តួសេចក្តី>
</ទំព័រ>`
  },
  {
    id: "resume",
    title: "ប្រវត្តិរូបសង្ខេប (Resume)",
    description: "ទម្រង់ប្រវត្តិរូបសង្ខេបអាជីពស្អាតប្លែកគេ សម្រាប់ដាក់ពាក្យធ្វើការងារផ្សេងៗ។",
    category: "ប្រវត្តិរូប",
    code: `<ទំព័រ>
  <ក្បាល>
    <ចំណងជើងទំព័រ>ប្រវត្តិរូបសង្ខេប</ចំណងជើងទំព័រ
  </ក្បាល>
  <តួសេចក្តី>
    <ប្លុក ថ្នាក់="max-w-2xl mx-auto my-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <ប្លុក ថ្នាក់="flex items-center space-x-6">
        <ប្លុក>
          <ចំណងជើងធំ ថ្នាក់="text-3xl font-bold text-gray-800">សុខ វណ្ណា</ចំណងជើងធំ>
          <ល្បះ ថ្នាក់="text-blue-600 font-bold">អ្នកជំនាញផ្នែកសរសេរកម្មវិធីកុំព្យូទ័រ</ល្បះ>
          <ល្បះ ថ្នាក់="text-gray-500 text-sm mt-1">អាសយដ្ឋាន៖ ភ្នំពេញ, កម្ពុជា | អ៊ីមែល៖ vanna@example.com</ល្បះ>
        </ប្លុក>
      </ប្លុក>

      <បន្ទាត់កាត់ ថ្នាក់="my-6" />

      <ចំណងជើងរង ថ្នាក់="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">បទពិសោធន៍ការងារ</ចំណងជើងរង>
      <ប្លុក ថ្នាក់="space-y-4 mb-6">
        <ប្លុក>
          <ល្បះ ថ្នាក់="font-bold text-gray-700">អ្នកសរសេរគេហទំព័រជាន់ខ្ពស់ នៅក្រុមហ៊ុន ខ្មែរថេក (២០២២ - បច្ចុប្បន្ន)</ល្បះ>
          <ល្បះ ថ្នាក់="text-gray-500 text-sm">ដឹកនាំក្រុមការងារក្នុងការបង្កើត និងរចនាគេហទំព័រជូនអតិថិជនជាតិ និងអន្តរជាតិ។</ល្បះ>
        </ប្លុក>
        <ប្លុក>
          <ល្បះ ថ្នាក់="font-bold text-gray-700">ជំនួយការបច្ចេកទេស នៅសាលា អង្គរអេកាដឺមី (២០២០ - ២០២២)</ល្បះ
          <ល្បះ ថ្នាក់="text-gray-500 text-sm">គ្រប់គ្រងប្រព័ន្ធបច្ចេកវិទ្យា និងជួយគាំទ្រដល់ការរៀនតាមអនឡាញ។</ល្បះ>
        </ប្លុក>
      </ប្លុក>

      <ចំណងជើងរង ថ្នាក់="text-xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">ប្រវត្តិសិក្សា</ចំណងជើងរង>
      <ល្បះ ថ្នាក់="font-bold text-gray-700 mb-6">បរិញ្ញាបត្រវិទ្យាសាស្ត្រកុំព្យូទ័រ ពីសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (២០១៦ - ២០២០)</ល្បះ>
    </ប្លុក>
  </តួសេចក្តី>
</ទំព័រ>`
  },
  {
    id: "form",
    title: "ទម្រង់ចុះឈ្មោះ (Registration Form)",
    description: "ទម្រង់បញ្ចូលព័ត៌មានចុះឈ្មោះសិក្សា ឬបង្កើតគណនីថ្មីយ៉ាងទាក់ទាញ។",
    category: "ទម្រង់បញ្ចូលទិន្នន័យ",
    code: `<ទំព័រ>
  <ក្បាល>
    <ចំណងជើងទំព័រ>ទម្រង់ចុះឈ្មោះចូលរៀន</ចំណងជើងទំព័រ
  </ក្បាល>
  <តួសេចក្តី>
    <ប្លុក ថ្នាក់="max-w-md mx-auto my-10 p-8 bg-emerald-50 rounded-3xl shadow-xl border border-emerald-100 text-gray-800">
      <ចំណងជើងធំ ថ្នាក់="text-2xl font-bold text-emerald-700 text-center mb-2">ចុះឈ្មោះចូលរៀន</ចំណងជើងធំ>
      <ល្បះ ថ្នាក់="text-emerald-600 text-sm text-center mb-6">សូមបំពេញព័ត៌មានខាងក្រោមដើម្បីចុះឈ្មោះរៀនវគ្គ KhmerHTML</ល្បះ>

      <ទម្រង់ ថ្នាក់="space-y-4">
        <ប្លុក>
          <ល្បះ ថ្នាក់="block font-medium mb-1 text-emerald-800">នាមខ្លួន និងនាមត្រកូល</ល្បះ>
          <ប្រអប់បញ្ចូល ប្រភេទ="text" ជំនួស="បញ្ចូលឈ្មោះរបស់អ្នក" ថ្នាក់="w-full p-3 border border-emerald-200 rounded-xl bg-white focus:outline-emerald-500" />
        </b្លុក>

        <ប្លុក>
          <ល្បះ ថ្នាក់="block font-medium mb-1 text-emerald-800">អ៊ីមែលទំនាក់ទំនង</ល្បះ
          <ប្រអប់បញ្ចូល ប្រភេទ="email" ជំនួស="vanna@example.com" ថ្នាក់="w-full p-3 border border-emerald-200 rounded-xl bg-white focus:outline-emerald-500" />
        </b្លុក>

        <ប្លុក>
          <ល្បះ ថ្នាក់="block font-medium mb-1 text-emerald-800">លេខទូរស័ព្ទ</ល្បះ
          <ប្រអប់បញ្ចូល ប្រភេទ="text" ជំនួស="០១២ ៣៤៥ ៦៧៨" ថ្នាក់="w-full p-3 border border-emerald-200 rounded-xl bg-white focus:outline-emerald-500" />
        </b្លុក>

        <ប្លុក>
          <ល្បះ ថ្នាក់="block font-medium mb-1 text-emerald-800">សារភ្ជាប់បន្ថែម</ល្បះ
          <ប្រអប់អត្ថបទ ជំនួស="តើអ្នកមានសំណួរអ្វីបន្ថែមទេ?" ថ្នាក់="w-full p-3 border border-emerald-200 rounded-xl bg-white h-24 focus:outline-emerald-500"></ប្រអប់អត្ថបទ>
        </b្លុក>

        <ប៊ូតុង ប្រភេទ="submit" ថ្នាក់="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-md">
          ផ្ញើពាក្យសុំចូលរៀន
        </ប៊ូតុង>
      </ទម្រង់>
    </ប្លុក>
  </តួសេចក្តី>
</ទំព័រ>`
  }
];

// 8. Dynamic Exercises
export const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    title: "លំហាត់ទី ១៖ រចនាសម្ព័ន្ធអត្ថបទដំបូង",
    description: "ចូររៀនបង្កើតចំណងជើង និងកថាខណ្ឌអត្ថបទធម្មតា។",
    instructions: [
      "បង្កើតស្លាកចំណងជើងធំ <ចំណងជើងធំ> មួយដែលមានអត្ថបទថា «ស្វាគមន៍»",
      "បង្កើតស្លាកល្បះ <ល្បះ> ចំនួនពីរ ដើម្បីសរសេររៀបរាប់ព័ត៌មានខ្លីៗ"
    ],
    starterCode: `<!-- ចូរសរសើរកូដលំហាត់ទី១ នៅខាងក្រោមនេះ -->
<តួសេចក្តី>

</តួសេចក្តី>`,
    validate: (html: string) => {
      const hasHeading = /<ចំណងជើងធំ\b[^>]*>([\s\S]*?)<\/ចំណងជើងធំ>/.test(html);
      const paragraphs = html.match(/<ល្បះ\b[^>]*>([\s\S]*?)<\/ល្បះ>/g);
      const countPara = paragraphs ? paragraphs.length : 0;

      if (!hasHeading) {
        return { success: false, hint: "អ្នកត្រូវការបង្កើតស្លាក <ចំណងជើងធំ>... </ចំណងជើងធំ> និងមានអត្ថបទខាងក្នុង។" };
      }
      if (countPara < 2) {
        return { success: false, hint: `អ្នកត្រូវបង្កើតស្លាកល្បះ <ល្បះ> យ៉ាងតិចចំនួន ២ (បច្ចុប្បន្នមាន៖ ${countPara})។` };
      }
      return { success: true };
    }
  },
  {
    id: "ex2",
    title: "លំហាត់ទី ២៖ បន្ថែមរូបភាព និងតំណភ្ជាប់",
    description: "រៀនបន្ថែមរូបភាព និងតំណភ្ជាប់ទៅកាន់គេហទំព័រដទៃ។",
    instructions: [
      "បង្កើតស្លាក <រូបភាព> ដែលមានគុណលក្ខណៈ ប្រភព (src)",
      "បង្កើតស្លាក <តំណភ្ជាប់> មួយដែលមានគុណលក្ខណៈ អាសយដ្ឋាន (href)"
    ],
    starterCode: `<!-- ចូរសរសើរកូដលំហាត់ទី២ នៅខាងក្រោមនេះ -->
<តួសេចក្តី>
  
</តួសេចក្តី>`,
    validate: (html: string) => {
      const hasImg = /<រូបភាព\b[^>]*>/.test(html) || /<រូបភាព\b[^>]*\/>/.test(html);
      const hasImgSrc = /ប្រភព\s*=\s*["']/.test(html) || /src\s*=\s*["']/.test(html);
      const hasLink = /<តំណភ្ជាប់\b[^>]*>([\s\S]*?)<\/តំណភ្ជាប់>/.test(html);
      const hasLinkHref = /អាសយដ្ឋាន\s*=\s*["']/.test(html) || /href\s*=\s*["']/.test(html);

      if (!hasImg) {
        return { success: false, hint: "អ្នកត្រូវការបង្កើតស្លាក <រូបភាព /> មួយ។" };
      }
      if (!hasImgSrc) {
        return { success: false, hint: "ស្លាក <រូបភាព> ត្រូវតែមានគុណលក្ខណៈ ប្រភព=\"...\"។" };
      }
      if (!hasLink) {
        return { success: false, hint: "អ្នកត្រូវការបង្កើតស្លាក <តំណភ្ជាប់>... </តំណភ្ជាប់> មួយ។" };
      }
      if (!hasLinkHref) {
        return { success: false, hint: "ស្លាក <តំណភ្ជាប់> ត្រូវតែមានគុណលក្ខណៈ អាសយដ្ឋាន=\"...\"។" };
      }
      return { success: true };
    }
  },
  {
    id: "ex3",
    title: "លំហាត់ទី ៣៖ បញ្ជីនិងតារាង",
    description: "រៀនរៀបចំបញ្ជីគ្មានលំដាប់ និងតារាងព័ត៌មានងាយស្រួលអាន។",
    instructions: [
      "បង្កើតបញ្ជីគ្មានលំដាប់ <បញ្ជីគ្មានលំដាប់> ដែលមានធាតុបញ្ជី <ធាតុបញ្ជី> យ៉ាងតិចចំនួន ៣",
      "បង្កើតតារាង <តារាង> ដែលមានយ៉ាងហោចណាស់ជួរដេក <ជួរដេក> មួយ"
    ],
    starterCode: `<!-- ចូរសរសើរកូដលំហាត់ទី៣ នៅខាងក្រោមនេះ -->
<តួសេចក្តី>

</តួសេចក្តី>`,
    validate: (html: string) => {
      const hasUl = /<បញ្ជីគ្មានលំដាប់\b[^>]*>/.test(html);
      const hasLi = html.match(/<ធាតុបញ្ជី\b[^>]*>/g);
      const countLi = hasLi ? hasLi.length : 0;
      const hasTable = /<តារាង\b[^>]*>/.test(html);
      const hasTr = /<ជួរដេក\b[^>]*>/.test(html);

      if (!hasUl) {
        return { success: false, hint: "អ្នកត្រូវការបង្កើតស្លាក <បញ្ជីគ្មានលំដាប់>... </បញ្ជីគ្មានលំដាប់>។" };
      }
      if (countLi < 3) {
        return { success: false, hint: `អ្នកត្រូវបង្កើតស្លាក <ធាតុបញ្ជី> យ៉ាងតិចចំនួន ៣ (បច្ចុប្បន្នមាន៖ ${countLi})។` };
      }
      if (!hasTable) {
        return { success: false, hint: "អ្នកត្រូវការបង្កើតស្លាក <តារាង>... </តារាង>។" };
      }
      if (!hasTr) {
        return { success: false, hint: "ស្លាក <តារាង> ត្រូវមានស្លាក <ជួរដេក>... </ជួរដេក> នៅខាងក្នុង។" };
      }
      return { success: true };
    }
  }
];
