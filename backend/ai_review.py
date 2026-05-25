def review_code(code):

    review = "AI Code Review Results\n\n"

    # Hardcoded password
    if "password" in code.lower():

        fixed_code = code.replace(
            'password = "12345"',
            "import os\npassword = os.getenv('PASSWORD')"
        )

        fixed_code = fixed_code.replace(
            "password='12345'",
            "import os\npassword = os.getenv('PASSWORD')"
        )

        review += (
            "🔴 HIGH RISK: Hardcoded password detected.\n\n"

            f"❌ YOUR CODE:\n{code}\n\n"

            f"✅ SUGGESTED FIX:\n{fixed_code}\n\n"

            "💡 Reason:\n"
            "Use environment variables for secrets.\n\n"
        )

    # eval detection
    if "eval(" in code:

        fixed_code = code.replace(
            "eval(user_input)",
            "print(user_input)"
        )

        review += (
            "🔴 DANGEROUS FUNCTION DETECTED\n\n"

            f"❌ YOUR CODE:\n{code}\n\n"

            f"✅ SUGGESTED FIX:\n{fixed_code}\n\n"

            "💡 Reason:\n"
            "eval() can execute malicious code.\n\n"
        )

    # SQL Injection
    if "SELECT" in code.upper():

        review += (
            "🟡 SQL INJECTION RISK DETECTED\n\n"

            f"❌ YOUR CODE:\n{code}\n\n"

            "✅ SUGGESTION:\n"
            "Use parameterized queries.\n\n"
        )

    if review == "AI Code Review Results\n\n":

        review += (
            "🟢 GOOD CODE QUALITY\n\n"
            "No major vulnerabilities detected.\n"
        )

    return review