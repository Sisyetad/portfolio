import 'package:url_launcher/url_launcher.dart';

class UseCase {
  final String name;
  final String description;
  final String url;

  UseCase({required this.name, required this.description, required this.url});

  Future<void> launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      print('Could not launch $url');
    }
  }

  Future<void> launchEmail(String toEmail, String subject, String body) async {
    final Uri emailUri = Uri(
      scheme: 'mailto',
      path: toEmail,
      queryParameters: {
        'subject': Uri.encodeComponent(subject),
        'body': Uri.encodeComponent(body),
      },
    );
    if (!await launchUrl(emailUri)) {
      print('Could not launch email client');
    }
  }
}
