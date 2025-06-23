import 'dart:html' as html;
import 'package:flutter/material.dart';
import 'package:portfolio_project/usecase.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    final nameController = TextEditingController();
    final emailController = TextEditingController();
    final messageController = TextEditingController();

    return Container(
      padding: const EdgeInsets.all(40),
      color: Colors.black87,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Contact Me',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: nameController,
            decoration: const InputDecoration(
              labelText: 'Name',
              labelStyle: TextStyle(color: Colors.white70),
              filled: true,
              fillColor: Colors.grey,
              border: OutlineInputBorder(),
            ),
            style: const TextStyle(color: Colors.white),
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: emailController,
            decoration: const InputDecoration(
              labelText: 'Email',
              labelStyle: TextStyle(color: Colors.white70),
              filled: true,
              fillColor: Colors.grey,
              border: OutlineInputBorder(),
            ),
            style: const TextStyle(color: Colors.white),
            keyboardType: TextInputType.emailAddress,
          ),
          const SizedBox(height: 16),
          TextFormField(
            controller: messageController,
            decoration: const InputDecoration(
              labelText: 'Message',
              labelStyle: TextStyle(color: Colors.white70),
              filled: true,
              fillColor: Colors.grey,
              border: OutlineInputBorder(),
            ),
            style: const TextStyle(color: Colors.white),
            maxLines: 4,
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              if (nameController.text.isEmpty ||
                  emailController.text.isEmpty ||
                  messageController.text.isEmpty) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Please fill all fields')),
                );
                return;
              }

              final subject = Uri.encodeComponent(
                'Portfolio Contact Form Submission',
              );
              final body = Uri.encodeComponent(
                'Name: ${nameController.text}\n'
                'Email: ${emailController.text}\n'
                'Message: ${messageController.text}',
              );

              final mailtoLink =
                  'mailto:sisaytadewos@gmail.com?subject=$subject&body=$body';
              final useCase = UseCase(
                name: 'Email',
                description: 'Message me via email',
                url: 'mailtoLink',
              );
              useCase.launchEmail(
                mailtoLink,
                'Portfolio Contact Form Submission',
                '''
              Name: ${nameController.text}
              Email: ${emailController.text}
              Message: ${messageController.text}
              ''',
              );

              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Opening email client...')),
              );

              nameController.clear();
              emailController.clear();
              messageController.clear();
            },
            child: const Text('Submit'),
          ),

          const SizedBox(height: 24),
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.link),
                color: Colors.white,
                onPressed: () {
                  final useCase = UseCase(
                    name: 'GitHub',
                    description: 'My GitHub Profile',
                    url: 'https://linkedin.com/in/sisay-tadewos-790228275',
                  );
                  useCase.launchURL(useCase.url);
                },
              ),
              IconButton(
                icon: const Icon(Icons.code),
                color: Colors.white,
                onPressed: () {
                  final useCase = UseCase(
                    name: 'GitHub',
                    description: 'My GitHub Profile',
                    url: 'https://github.com/Sisyetad',
                  );
                  useCase.launchURL(useCase.url);
                },
              ),
              IconButton(
                icon: const Icon(Icons.email),
                color: Colors.white,
                onPressed: () {
                  final useCase = UseCase(
                    name: 'GitHub',
                    description: 'My GitHub Profile',
                    url: 'mailto:sisaytadewos@gmail.com',
                  );
                  useCase.launchURL(useCase.url);
                },
              ),
              ElevatedButton(
                onPressed: () {
                  html.window.open(
                    'mailto:sisaytadewos@gmail.com?subject=Hello&body=This is a test email from Flutter Web',
                    '_blank',
                  );
                },
                child: Text('Send Test Email'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
