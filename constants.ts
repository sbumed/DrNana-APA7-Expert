
import { MenuItem, Language } from './types';
import { BookOpenIcon, LinkIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, ChartBarIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

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
  th: `### สวัสดีค่ะ! ดิฉัน **ดร.นาน่า V.2** (Dr. Nana) 👩‍🏫
ผู้เชี่ยวชาญด้าน **APA 7th Edition** โฉมใหม่ ยินดีให้คำปรึกษาค่ะ

สามารถสอบถามเรื่อง:
*   📚 **การเขียนอ้างอิง** (References)
*   📝 **การอ้างอิงในเนื้อหา** (In-text citation)
*   📊 **การรายงานผลสถิติ** (Statistical Reporting)
*   📄 **การจัดรูปแบบเอกสาร** (Formatting)

*เลือกหัวข้อจากเมนู หรือพิมพ์คำถามได้เลยค่ะ* 👇`,
  en: `### Hello! I am **Dr. Nana V.2** 👩‍🏫
Your **APA 7th Edition** Expert, here to assist you with the latest updates.

I can help you with:
*   📚 **Reference List Entries**
*   📝 **In-text Citations**
*   📊 **Statistical Reporting**
*   📄 **Paper Formatting**

*Select a topic from the menu or type your question below* 👇`
};

// Updated Image URL as requested
export const DR_NANA_IMAGE_URL = "https://i.postimg.cc/cCTTx4Jj/Dr-Nana.png";
// Updated User Avatar to 3D Cute style (Fun Emoji seed)
export const USER_AVATAR_URL = "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Mochi";

export const SUGGESTION_QUESTIONS: Record<Language, string[]> = {
  th: [
    "ช่วยเขียนอ้างอิงเว็บไซต์ให้หน่อย",
    "รูปแบบการเขียนบรรณานุกรมหนังสือแปล",
    "ช่วยสร้างอ้างอิงในเนื้อหาสำหรับผู้แต่ง 3 คน",
    "การตั้งค่าหน้ากระดาษตามหลัก APA 7",
    "อ้างอิงคลิป YouTube ต้องใส่อะไรบ้าง?",
    "การรายงานผล t-test ในเนื้อหาทำอย่างไร?"
  ],
  en: [
    "Help me cite a website URL",
    "Reference format for translated books",
    "Generate in-text citation for 3 authors",
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
        title: { th: "ตัวช่วยเขียนอ้างอิงในเนื้อหา", en: "In-text Citation Generator" },
        icon: PencilSquareIcon,
        subItems: [
            { 
                title: { th: "1 ผู้แต่ง (1 Author)", en: "1 Author" }, 
                prompt: { th: "ช่วยสร้างอ้างอิงในเนื้อหา (In-text citation) สำหรับผู้แต่ง 1 คน กรุณาถามชื่อผู้แต่งและปีพิมพ์จากฉัน", en: "Help me generate an in-text citation for 1 author. Please ask me for the author's name and year." } 
            },
            { 
                title: { th: "2 ผู้แต่ง (2 Authors)", en: "2 Authors" }, 
                prompt: { th: "ช่วยสร้างอ้างอิงในเนื้อหาสำหรับผู้แต่ง 2 คน กรุณาถามชื่อผู้แต่งทั้งสองและปีพิมพ์", en: "Help me generate an in-text citation for 2 authors. Please ask me for the names and year." } 
            },
            { 
                title: { th: "3 คนขึ้นไป (3+ Authors)", en: "3+ Authors" }, 
                prompt: { th: "ช่วยสร้างอ้างอิงในเนื้อหาสำหรับผู้แต่ง 3 คนขึ้นไป (ใช้ et al.) กรุณาถามชื่อผู้แต่งคนแรกและปีพิมพ์", en: "Help me generate an in-text citation for 3+ authors (using et al.). Please ask me for the first author's name and year." } 
            },
            { 
                title: { th: "องค์กร/หน่วยงาน", en: "Group Author" }, 
                prompt: { th: "ช่วยสร้างอ้างอิงในเนื้อหาสำหรับองค์กร (Group Author) กรุณาถามชื่อองค์กร (และตัวย่อถ้ามี) และปีพิมพ์", en: "Help me generate an in-text citation for a Group Author. Please ask me for the organization name (and abbreviation if applicable) and year." } 
            }
        ]
    },
    {
        title: { th: "กฎการอ้างอิง (Rules)", en: "Citation Rules" },
        icon: ChatBubbleBottomCenterTextIcon,
        subItems: [
            { 
                title: { th: "หลักการ 1 ผู้แต่ง", en: "One Author Rules" }, 
                prompt: { th: "อธิบายกฎการอ้างอิงในเนื้อหาสำหรับผู้แต่ง 1 คน พร้อมตัวอย่าง", en: "Explain in-text citation rules for one author with examples." } 
            },
            { 
                title: { th: "หลักการ 2 ผู้แต่ง", en: "Two Authors Rules" }, 
                prompt: { th: "อธิบายกฎการอ้างอิงในเนื้อหาสำหรับผู้แต่ง 2 คน พร้อมตัวอย่าง", en: "Explain in-text citation rules for two authors with examples." } 
            },
            { 
                title: { th: "หลักการ 3 คนขึ้นไป", en: "3+ Authors Rules" }, 
                prompt: { th: "การใช้ et al. สำหรับผู้แต่ง 3 คนขึ้นไปใน APA 7 ทำอย่างไร", en: "How to use 'et al.' for 3 or more authors in APA 7?" } 
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
                title: { th: "เว็บไซต์ (Webpage)", en: "Webpage" }, 
                prompt: { th: "ช่วยเขียนอ้างอิงบรรณานุกรมสำหรับเว็บไซต์ (Webpage) กรุณาถาม URL, ชื่อบทความ, ชื่อผู้แต่ง (ถ้ามี) และวันที่จากฉัน", en: "Help me create an APA 7 reference for a Webpage. Please ask me for the URL, Article Title, Author, and Date." } 
            },
            { 
                title: { th: "หนังสือ (Book)", en: "Book" }, 
                prompt: { th: "รูปแบบบรรณานุกรมสำหรับหนังสือ (Book) ใน APA 7", en: "Reference format for a Book in APA 7." } 
            },
            { 
                title: { th: "บทความวารสาร (Journal)", en: "Journal Article" }, 
                prompt: { th: "รูปแบบบรรณานุกรมสำหรับบทความวารสาร (Journal Article) มี DOI และไม่มี DOI", en: "Reference format for Journal Articles (with and without DOI)." } 
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
