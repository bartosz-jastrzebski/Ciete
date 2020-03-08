import sys, os

sys.path.append(os.getcwd())
os.environ['DJANGO_SETTINGS_MODULE'] = "ciete.settings"  


INTERP = "/home/ciete/.virtualenvs/ciete-django/bin/python3.6"
#INTERP is present twice so that the new python interpreter 
#knows the actual executable path 
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)

# cwd = os.getcwd()
# sys.path.append(cwd)
# sys.path.append(cwd + '/ciete')  #You must add your project here

# sys.path.insert(0,cwd+'/venv/bin')
# sys.path.insert(0,cwd+'/venv/lib/python3.6/site-packages')

import ciete.wsgi

application = ciete.wsgi.application
