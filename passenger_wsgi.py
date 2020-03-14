import sys, os

sys.path.append(os.getcwd())
os.environ['DJANGO_SETTINGS_MODULE'] = "ciete.settings"  


INTERP = "/home/ciete/.virtualenvs/ciete-django/bin/python3.6"

if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

import ciete.wsgi

application = ciete.wsgi.application
