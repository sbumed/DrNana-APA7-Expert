
import { MenuItem, Language } from './types';
import { BookOpenIcon, LinkIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export const SYSTEM_INSTRUCTION = `
You are Dr. Nana, a world-class expert in APA 7th Edition (American Psychological Association) academic writing and citation style.
Your goal is to assist students, researchers, and academics in perfecting their references and formatting.

**CRITICAL RULE FOR THAI LANGUAGE:**
If the user asks in Thai or the context is Thai, **YOU MUST USE THAI EXAMPLES ONLY** (Thai names, Thai book titles, Thai journals, Buddhist Era years like 2567).
- **DO NOT** use English examples (Smith, Jones, etc.) unless the user specifically asks for an English example.
- **Example**: Instead of "Smith (2020)", use "สมชาย (2563)".
- **Example**: Instead of "Journal of Psychology", use "วารสารจิตวิทยา".

Guidelines:
1. **Expertise**: You have encyclopedic knowledge of the APA 7 Publication Manual.
2. **Tone**: Professional, encouraging, precise, and academic yet accessible.
3. **Language**: **Adapt to the user's language**.
4. **Tasks**:
    - **Citation Correction**: If a user provides a reference, rewrite it in perfect APA 7 format. Point out specific errors you fixed.
    - **In-text Citations**: Explain parenthetical vs. narrative citations.
    - **Formatting**: Answer questions about margins, headings, abstract, title page, etc.
    - **Statistical Reporting**: Explain how to report statistics (Mean, SD, t-test, ANOVA, etc.) in APA style.
5. **Formatting Output**:
    - Use Markdown extensively.
    - Use **Headings (H2, H3)** for structure.
    - Use **Lists (Bullet/Number)** for readability.
    - Use **Tables** for comparisons.
    - Use **Code Blocks** for corrected citations.

Example Interaction (Thai context):
User: "อ้างอิงหนังสือทั่วไปยังไง"
Dr. Nana: "## 📖 รูปแบบการอ้างอิงหนังสือ (Book) - APA 7

### 1. รูปแบบ (Format)
> ชื่อผู้แต่ง. (ปีที่พิมพ์). *ชื่อหนังสือ*. สำนักพิมพ์.

### 2. ตัวอย่าง (Example)
**บรรณานุกรม (Reference List):**
\`\`\`text
สุรางค์ โค้วตระกูล. (2559). *จิตวิทยาการศึกษา* (พิมพ์ครั้งที่ 12). สำนักพิมพ์แห่งจุฬาลงกรณ์มหาวิทยาลัย.
\`\`\`

**การอ้างอิงในเนื้อหา (In-text Citation):**
*   **เน้นข้อความ (Parenthetical):** (สุรางค์ โค้วตระกูล, 2559)
*   **เน้นผู้แต่ง (Narrative):** สุรางค์ โค้วตระกูล (2559) กล่าวว่า..."
`;

export const WELCOME_MESSAGE: Record<Language, string> = {
  th: `### สวัสดีค่ะ! ดิฉัน **ดร.นาน่า** (Dr. Nana) 👩‍🏫
ผู้เชี่ยวชาญด้าน **APA 7th Edition** ยินดีให้คำปรึกษาค่ะ

สามารถสอบถามเรื่อง:
*   📚 **การเขียนอ้างอิง** (References)
*   📝 **การอ้างอิงในเนื้อหา** (In-text citation)
*   📊 **การรายงานผลสถิติ** (Statistical Reporting)
*   📄 **การจัดรูปแบบเอกสาร** (Formatting)

*เลือกหัวข้อจากเมนู หรือพิมพ์คำถามได้เลยค่ะ* 👇`,
  en: `### Hello! I am **Dr. Nana** 👩‍🏫
An **APA 7th Edition** Expert, here to assist you.

I can help you with:
*   📚 **Reference List Entries**
*   📝 **In-text Citations**
*   📊 **Statistical Reporting**
*   📄 **Paper Formatting**

*Select a topic from the menu or type your question below* 👇`
};

export const DR_NANA_IMAGE_URL = "https://i.postimg.cc/CxnC1yPV/Dr-Nana.png";
export const USER_AVATAR_URL = "https://api.dicebear.com/9.x/notionists/svg?seed=Felix";

export const SUGGESTION_QUESTIONS: Record<Language, string[]> = {
  th: [
    "อ้างอิงเว็บไซต์ที่ไม่มีชื่อผู้แต่งยังไง?",
    "รูปแบบการเขียนบรรณานุกรมหนังสือแปล",
    "ความแตกต่างระหว่างการอ้างอิงในเนื้อหาและท้ายเล่ม",
    "การตั้งค่าหน้ากระดาษตามหลัก APA 7",
    "อ้างอิงคลิป YouTube ต้องใส่อะไรบ้าง?",
    "การรายงานผล t-test ในเนื้อหาทำอย่างไร?"
  ],
  en: [
    "How to cite a website with no author?",
    "Reference format for translated books",
    "Difference between in-text citation and reference list",
    "Paper formatting guidelines in APA 7",
    "How to cite a YouTube video?",
    "How to report t-test results in text?"
  ]
};

export const UI_TEXT: Record<Language, any> = {
    th: {
        placeholder: "พิมพ์คำถาม หรือแนบไฟล์ (PDF, รูปภาพ, CSV)...",
        send: "ส่งข้อความ",
        errorMsg: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาตรวจสอบอินเทอร์เน็ตหรือ API Key ของคุณ",
        copy: "คัดลอก MD",
        copied: "คัดลอกแล้ว",
        pdf: "ส่งออก PDF",
        disclaimer: "ดร.นาน่าอาจมีข้อผิดพลาดได้ โปรดตรวจสอบความถูกต้องกับคู่มือ APA 7th Edition อีกครั้ง",
        apiKeyTitle: "ตั้งค่า API Key",
        apiKeyDesc: "เพื่อเริ่มปรึกษากับ ดร.นาน่า กรุณาระบุ Google AI Studio API Key ของคุณ (คีย์จะถูกบันทึกในเบราว์เซอร์ของคุณเท่านั้น)",
        saveKey: "บันทึกและเริ่มใช้งาน",
        getKey: "รับคีย์ฟรี",
        settings: "ตั้งค่า",
        thinking: "ดร.นาน่า กำลังตรวจสอบข้อมูล...",
        menu: "เมนูหลัก",
        menuRecommend: "เมนูแนะนำ",
        languageName: "ภาษาไทย",
        attach: "แนบไฟล์",
        remove: "ลบ"
    },
    en: {
        placeholder: "Ask a question or attach files (PDF, Image, CSV)...",
        send: "Send Message",
        errorMsg: "Connection error. Please check your internet or API Key.",
        copy: "Copy MD",
        copied: "Copied",
        pdf: "Export PDF",
        disclaimer: "Dr. Nana can make mistakes. Please verify important information with the APA 7th Edition manual.",
        apiKeyTitle: "Set API Key",
        apiKeyDesc: "To start consulting with Dr. Nana, please provide your Google AI Studio API Key (stored locally in your browser).",
        saveKey: "Save & Start",
        getKey: "Get Free Key",
        settings: "Settings",
        thinking: "Dr. Nana is thinking...",
        menu: "Menu",
        menuRecommend: "Suggested Topics",
        languageName: "English",
        attach: "Attach",
        remove: "Remove"
    }
};

export const SIDEBAR_DATA: MenuItem[] = [
    {
        title: { th: "การอ้างอิงในเนื้อหา", en: "In-text Citations" },
        icon: ChatBubbleBottomCenterTextIcon,
        subItems: [
            { 
                title: { th: "1 ผู้แต่ง (One author)", en: "One Author" }, 
                prompt: { th: "ขอตัวอย่างการอ้างอิงในเนื้อหา (In-text citation) สำหรับผู้แต่ง 1 คน แบบเน้นผู้แต่งและเน้นข้อความ", en: "Provide examples of in-text citations for one author (parenthetical and narrative)." } 
            },
            { 
                title: { th: "2 ผู้แต่ง (Two authors)", en: "Two Authors" }, 
                prompt: { th: "ขอตัวอย่างการอ้างอิงในเนื้อหา สำหรับผู้แต่ง 2 คน", en: "Provide examples of in-text citations for two authors." } 
            },
            { 
                title: { th: "3 คนขึ้นไป (3+ authors)", en: "3+ Authors (et al.)" }, 
                prompt: { th: "การใช้ et al. สำหรับผู้แต่ง 3 คนขึ้นไปใน APA 7 ทำอย่างไร", en: "How to use 'et al.' for 3 or more authors in APA 7?" } 
            },
            { 
                title: { th: "องค์กร/หน่วยงาน", en: "Group Authors" }, 
                prompt: { th: "การอ้างอิงในเนื้อหาสำหรับองค์กร (Group Author) ที่มีและไม่มีตัวย่อ", en: "How to cite group authors (with and without abbreviations) in text?" } 
            },
            { 
                title: { th: "การอ้างอิงซ้ำ (Ibid)", en: "Recurring Citations (Ibid)" }, 
                prompt: { th: "APA 7 ยังใช้ Ibid หรือไม่ และถ้าต้องอ้างอิงซ้ำทำอย่างไร", en: "Does APA 7 use 'Ibid'? How to handle recurring citations?" } 
            }
        ]
    },
    {
        title: { th: "บรรณานุกรม (References)", en: "References List" },
        icon: BookOpenIcon,
        subItems: [
            { 
                title: { th: "หนังสือ (Book)", en: "Book" }, 
                prompt: { th: "รูปแบบบรรณานุกรมสำหรับหนังสือ (Book) ใน APA 7", en: "Reference format for a Book in APA 7." } 
            },
            { 
                title: { th: "บทความวารสาร (Journal)", en: "Journal Article" }, 
                prompt: { th: "รูปแบบบรรณานุกรมสำหรับบทความวารสาร (Journal Article) มี DOI และไม่มี DOI", en: "Reference format for Journal Articles (with and without DOI)." } 
            },
            { 
                title: { th: "เว็บไซต์ (Website)", en: "Website" }, 
                prompt: { th: "การเขียนอ้างอิงเว็บไซต์ (Website) ในรูปแบบ APA 7", en: "Reference format for a Website in APA 7." } 
            },
            { 
                title: { th: "วิทยานิพนธ์ (Thesis)", en: "Thesis/Dissertation" }, 
                prompt: { th: "รูปแบบการอ้างอิงวิทยานิพนธ์ (Thesis/Dissertation)", en: "Reference format for Thesis or Dissertation." } 
            },
            { 
                title: { th: "รายงานรัฐบาล", en: "Gov/Org Reports" }, 
                prompt: { th: "การอ้างอิงรายงานของหน่วยงานรัฐ หรือรายงานองค์กร", en: "Reference format for Government or Organizational Reports." } 
            }
        ]
    },
    {
        title: { th: "การรายงานผลสถิติ", en: "Statistical Reporting" },
        icon: ChartBarIcon,
        subItems: [
            { 
                title: { th: "สถิติพื้นฐาน (Mean, SD)", en: "Basic Stats (Mean, SD)" }, 
                prompt: { th: "วิธีรายงานค่า Mean (M) และ Standard Deviation (SD) ในตารางและในเนื้อหาตามหลัก APA 7 พร้อมตัวอย่างการอ่านค่าตาราง", en: "How to report Mean (M) and Standard Deviation (SD) in text and tables per APA 7." } 
            },
            { 
                title: { th: "t-test", en: "t-test" }, 
                prompt: { th: "วิธีรายงานผลสถิติ t-test (Independent & Paired) ตามหลัก APA 7 พร้อมตัวอย่างตารางและการอ่านค่าแปลผล", en: "How to report t-test results (Independent & Paired) in APA 7." } 
            },
            { 
                title: { th: "One-way ANOVA", en: "One-way ANOVA" }, 
                prompt: { th: "วิธีรายงานผลสถิติ One-way ANOVA (F-test) ตามหลัก APA 7 พร้อมตัวอย่างตารางและการอ่านค่าแปลผล", en: "How to report One-way ANOVA (F-test) results in APA 7." } 
            },
            { 
                title: { th: "Correlation (r)", en: "Correlation (r)" }, 
                prompt: { th: "วิธีรายงานผลสหสัมพันธ์ Pearson Correlation (r) ตามหลัก APA 7 พร้อมตัวอย่างตารางและการแปลผล", en: "How to report Pearson Correlation (r) in APA 7." } 
            },
            { 
                title: { th: "Regression (R²)", en: "Regression (R²)" }, 
                prompt: { th: "วิธีรายงานผล Simple Linear Regression ตามหลัก APA 7 พร้อมตัวอย่างตารางและการแปลผล", en: "How to report Simple Linear Regression results in APA 7." } 
            },
            { 
                title: { th: "Chi-Square", en: "Chi-Square" }, 
                prompt: { th: "วิธีรายงานผล Chi-Square Test ตามหลัก APA 7 พร้อมตัวอย่างตารางและการแปลผล", en: "How to report Chi-Square Test results in APA 7." } 
            },
            { 
                title: { th: "สัญลักษณ์ทางสถิติ", en: "Statistical Symbols" }, 
                prompt: { th: "สรุปสัญลักษณ์ทางสถิติที่ใช้บ่อยใน APA 7 (เช่น M, SD, p, t, F) และหลักการเขียน (ตัวเอียง/ไม่เอียง)", en: "Common statistical symbols in APA 7 (M, SD, p, t, F) and italics rules." } 
            }
        ]
    },
    {
        title: { th: "สื่อออนไลน์ & อื่นๆ", en: "Online Media & Others" },
        icon: LinkIcon,
        subItems: [
            { 
                title: { th: "YouTube / Video", en: "YouTube / Video" }, 
                prompt: { th: "การอ้างอิงคลิปวิดีโอ YouTube ใน APA 7", en: "How to cite a YouTube video in APA 7." } 
            },
            { 
                title: { th: "Social Media (FB/IG)", en: "Social Media (FB/IG)" }, 
                prompt: { th: "การอ้างอิงโพสต์ Facebook หรือ Instagram", en: "How to cite Facebook or Instagram posts." } 
            },
            { 
                title: { th: "กฎหมาย/พรบ.", en: "Legal/Acts" }, 
                prompt: { th: "ตัวอย่างการอ้างอิงพระราชบัญญัติ (พ.ร.บ.) หรือกฎหมายไทย ในรูปแบบ APA", en: "How to cite Laws or Acts in APA format." } 
            },
            { 
                title: { th: "บทสัมภาษณ์", en: "Personal Comm." }, 
                prompt: { th: "การอ้างอิงบทสัมภาษณ์ส่วนบุคคล (Personal Communication)", en: "How to cite Personal Communications (interviews, emails)." } 
            }
        ]
    },
    {
        title: { th: "การจัดรูปแบบ (Formatting)", en: "Formatting" },
        icon: DocumentTextIcon,
        subItems: [
            { 
                title: { th: "การตั้งค่าหน้ากระดาษ", en: "Page Setup" }, 
                prompt: { th: "สรุปการตั้งค่าหน้ากระดาษ (Margins, Font, Line Spacing) ตามหลัก APA 7", en: "Page setup guidelines (Margins, Font, Line Spacing) for APA 7." } 
            },
            { 
                title: { th: "ลำดับหัวข้อ (Headings)", en: "Headings Levels" }, 
                prompt: { th: "อธิบายลำดับหัวข้อ (Headings) ระดับ 1 ถึง 5 ใน APA 7", en: "Explain Heading Levels 1-5 in APA 7." } 
            },
            { 
                title: { th: "หน้าปก (Title Page)", en: "Title Page" }, 
                prompt: { th: "ส่วนประกอบของหน้าปก (Title Page) สำหรับนักศึกษา", en: "Student Title Page components in APA 7." } 
            },
            { 
                title: { th: "ตารางและภาพประกอบ", en: "Tables & Figures" }, 
                prompt: { th: "หลักการใส่ตาราง (Tables) และภาพประกอบ (Figures) ใน APA 7", en: "Guidelines for Tables and Figures in APA 7." } 
            }
        ]
    }
];
