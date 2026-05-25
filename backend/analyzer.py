import tempfile
import subprocess


def run_pylint(code):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as temp:

        temp.write(code.encode())

        temp_path = temp.name

    result = subprocess.run(
        ["pylint", temp_path],
        capture_output=True,
        text=True
    )

    return result.stdout