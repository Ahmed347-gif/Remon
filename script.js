        // تفعيل القائمة المتنقلة على الهواتف
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            // فتح/إغلاق القائمة المتنقلة
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // إغلاق القائمة عند النقر على رابط
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // تفعيل الأسئلة الشائعة
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', function() {
                    // إغلاق جميع الأسئلة الأخرى
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // فتح/إغلاق السؤال الحالي
                    item.classList.toggle('active');
                });
            });
            
            // الكود الخاص بالنموذج وإرسال البيانات إلى الواتساب
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const loadingSpinner = document.getElementById('loading-spinner');
            const successMessage = document.getElementById('success-message');
            
            // رقم الواتساب
            const whatsappNumber = "201226105036";
            
            // التحقق من صحة البيانات
            function validateForm() {
                let isValid = true;
                
                // التحقق من الاسم
                const name = document.getElementById('name').value.trim();
                const nameError = document.getElementById('name-error');
                if (name === '') {
                    nameError.textContent = 'يرجى إدخال الاسم الكامل';
                    isValid = false;
                } else {
                    nameError.textContent = '';
                }
                
                // التحقق من البريد الإلكتروني
                const email = document.getElementById('email').value.trim();
                const emailError = document.getElementById('email-error');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email === '') {
                    emailError.textContent = 'يرجى إدخال البريد الإلكتروني';
                    isValid = false;
                } else if (!emailRegex.test(email)) {
                    emailError.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                    isValid = false;
                } else {
                    emailError.textContent = '';
                }
                
                // التحقق من رقم الهاتف
                const phone = document.getElementById('phone').value.trim();
                const phoneError = document.getElementById('phone-error');
                const phoneRegex = /^[\+]?[0-9]{10,15}$/;
                if (phone === '') {
                    phoneError.textContent = 'يرجى إدخال رقم الهاتف';
                    isValid = false;
                } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                    phoneError.textContent = 'يرجى إدخال رقم هاتف صحيح';
                    isValid = false;
                } else {
                    phoneError.textContent = '';
                }
                
                // التحقق من نوع الخدمة
                const service = document.getElementById('service').value;
                const serviceError = document.getElementById('service-error');
                if (service === '') {
                    serviceError.textContent = 'يرجى اختيار نوع الخدمة';
                    isValid = false;
                } else {
                    serviceError.textContent = '';
                }
                
                // التحقق من التفاصيل
                const message = document.getElementById('message').value.trim();
                const messageError = document.getElementById('message-error');
                if (message === '') {
                    messageError.textContent = 'يرجى إدخال تفاصيل القضية أو الاستشارة';
                    isValid = false;
                } else if (message.length < 10) {
                    messageError.textContent = 'يرجى إدخال تفاصيل أكثر (10 أحرف على الأقل)';
                    isValid = false;
                } else {
                    messageError.textContent = '';
                }
                
                return isValid;
            }
            
            // إرسال النموذج
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (!validateForm()) {
                    return;
                }
                
                // عرض مؤشر التحميل
                btnText.textContent = 'جاري الإرسال...';
                loadingSpinner.style.display = 'block';
                submitBtn.disabled = true;
                
                // جمع البيانات
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const service = document.getElementById('service').value;
                const message = document.getElementById('message').value.trim();
                
                // إنشاء نص الرسالة
                const text = `📋 طلب استشارة قانونية جديد

👤 الاسم: ${name}
📧 البريد الإلكتروني: ${email}
📞 رقم الهاتف: ${phone}
⚖️ نوع الخدمة: ${service}

📝 تفاصيل القضية/الاستشارة:
${message}

⏰ تم الإرسال في: ${new Date().toLocaleString('ar-EG')}
🌐 مصدر الطلب: موقع المحامي`;

                // ترميز النص للرابط
                const encodedText = encodeURIComponent(text);
                const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
                
                // إظهار رسالة النجاح
                successMessage.style.display = 'block';
                
                // فتح واتساب بعد تأخير بسيط لتحسين تجربة المستخدم
                setTimeout(function() {
                    // فتح واتساب في نافذة جديدة
                    window.open(url, '_blank');
                    
                    // إعادة تعيين النموذج وعناصر الواجهة
                    setTimeout(function() {
                        contactForm.reset();
                        btnText.textContent = 'إرسال البيانات إلى واتساب';
                        loadingSpinner.style.display = 'none';
                        successMessage.style.display = 'none';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            });
            
            // إضافة تحقق فوري أثناء الكتابة
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', validateForm);
            });
        });
