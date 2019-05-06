# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from .forms import SignUpForm
from .tokens import account_activation_token
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.password_validation import password_validators_help_texts, validate_password
from django.core.exceptions import ValidationError
from django.http import HttpResponse
import json
from django.core.urlresolvers import reverse
import sys
# Create your views here.


def home(request):
    return render(request, 'base.html')


def signup(request):
    if request.method == 'POST':
        try:
            if validate_password(request.POST.get('password1')) is None:
                pass
            else:
                print password_validators_help_texts()
        except ValidationError:
            res = HttpResponse(json.dumps({'error': 1,
                                           'message': 'Deberia ser mas larga la contraseñapassword_reset',
                                           'dom_element': '#password1'}),
                               content_type="application/json")
            res.status_code = 400
            return res
        # check if password and verification match
        if request.POST["password1"] and request.POST["password2"]:
            if request.POST["password1"] != request.POST["password2"]:
                res = HttpResponse(json.dumps({'error': 1,
                                               'message': 'Las contrasenas no coinciden!',
                                               'dom_element': '#password1'}),
                                   content_type="application/json")
                res.status_code = 400
                return res
        else:
            res = HttpResponse(json.dumps({'error': 2,
                                           'message': 'Por favor, ingrese una contrasena',
                                           'dom_element': '#password1'}),
                               content_type="application/json")
            res.status_code = 400
            return res
        # check if user already exists
        try:
            u = User.objects.get(username=request.POST["username"])
            res = HttpResponse(json.dumps({'error': 3,
                                           'message': 'Este nombre de usuario ya esta en uso',
                                           'dom_element': '#username'}),
                               content_type="application/json")
            res.status_code = 400
            return res
        except:
            pass
        try:
            u = User.objects.get(email=request.POST["email"])
            if u is not None:
                res = HttpResponse(json.dumps({'error': 3,
                                               'message': 'Este email ya esta en uso',
                                               'dom_element': '#username'}),
                                   content_type="application/json")
                res.status_code = 400
                return res
        except:
            pass

        form = SignUpForm(request.POST)
        print form.errors
        if form.is_valid():
            print "despues del form"
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            subject = 'Activa tu cuenta'
            message = render_to_string('account_activation_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            user.email_user(subject, message)
            print "aca"
            return redirect(reverse('account:account_activation_sent'))
        else:
            errors = str(form.errors)
            res = HttpResponse(json.dumps({'error': 3,
                                           'message': errors,
                                           'dom_element': '#username'}),
                               content_type="application/json")
            res.status_code = 400
            return res


def account_activation_sent(request):
    return render(request, 'account_activation_sent.html')


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.profile.email_confirmed = True
        user.save()
        login(request, user)
        return redirect('/')
    else:
        return render(request, 'account_activation_invalid.html')


def terms(request):
    return render(request, 'term.html')
