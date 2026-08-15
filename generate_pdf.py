from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib import colors

content = []
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='TitleStyle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=20, leading=24, spaceAfter=12, textColor=colors.HexColor('#1f4e79')))
styles.add(ParagraphStyle(name='SubtitleStyle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=13, leading=16, spaceAfter=8, textColor=colors.HexColor('#2f5597')))
styles.add(ParagraphStyle(name='BodyStyle', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.5, leading=14, alignment=TA_JUSTIFY, spaceAfter=6))
styles.add(ParagraphStyle(name='BulletStyle', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.5, leading=14, leftIndent=12, bulletIndent=0, spaceAfter=4))

content.append(Paragraph('Hybrid Playwright Framework – Explanation Summary', styles['TitleStyle']))
content.append(Paragraph('Prepared for presentation/jury use', styles['SubtitleStyle']))
content.append(Spacer(1, 8))

sections = [
    ("1. Framework Explanation", "This project is a hybrid test automation framework built using Playwright. It is used to test an application through different channels such as web, API, and mobile. The purpose of this framework is to make testing more organized, reusable, and easier to maintain."),
    ("2. Why this framework is useful", "It helps reduce code duplication, improves readability, supports multiple test types, and makes maintenance easier. It also provides structured reporting so results are easier to understand and share."),
    ("3. How the framework is structured", "The project is divided into test files, page object files, utilities, and configuration files. Tests contain the scenarios, page objects handle UI interactions, utilities manage shared logic, and configuration controls the execution environment."),
    ("4. Adding more API tests", "New API tests can be added easily by creating a new test file, using the shared API helper, sending requests such as GET, POST, PUT, or DELETE, and validating the response."),
    ("5. Explanation of APIUtils", "The APIUtils file acts as the API communication layer of the framework. It prepares the request context, sends HTTP requests, and closes the connection properly after use. It makes API tests cleaner and reusable."),
    ("6. Line-by-line explanation of APIUtils", "The file imports Playwright request tools, creates a class named APIUtils, stores the API request context, sets up the base URL and headers, sends GET/POST/PUT/DELETE requests, and disposes the context when done. This makes the code modular and easy to reuse across tests."),
]

for title, body in sections:
    content.append(Paragraph(title, styles['SubtitleStyle']))
    content.append(Paragraph(body, styles['BodyStyle']))
    content.append(Spacer(1, 6))

content.append(PageBreak())
content.append(Paragraph('Short Presentation Version', styles['SubtitleStyle']))
content.append(Paragraph('This project is a hybrid test automation framework built with Playwright. It supports web, API, and mobile testing in a structured and scalable way. The framework is organized into test files, page objects, utilities, and configuration files, which makes it reusable, maintainable, and easier to expand with new test cases.', styles['BodyStyle']))
content.append(Spacer(1, 8))
content.append(Paragraph('30-Second Viva Version', styles['SubtitleStyle']))
content.append(Paragraph('This framework is a Playwright-based hybrid automation framework designed for end-to-end testing. It supports web, API, and mobile testing, keeps the code organized through page objects and utilities, and makes testing easier to maintain and scale. With Allure reporting, results are clear and professional.', styles['BodyStyle']))
content.append(Spacer(1, 8))
content.append(Paragraph('Slide-Style Presentation Version', styles['SubtitleStyle']))
content.append(Paragraph('Title: Hybrid Test Automation Framework using Playwright', styles['BodyStyle']))
content.append(Paragraph('• Web testing through browser automation', styles['BulletStyle']))
content.append(Paragraph('• API testing through backend requests', styles['BulletStyle']))
content.append(Paragraph('• Mobile testing through responsive browser view', styles['BulletStyle']))
content.append(Paragraph('• Reusable structure with clear separation of concerns', styles['BulletStyle']))
content.append(Paragraph('• Scalable and easy to extend for future testing needs', styles['BulletStyle']))

filename = 'framework_explanation.pdf'
doc = SimpleDocTemplate(filename, pagesize=A4, rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50)
doc.build(content)
print(filename)
