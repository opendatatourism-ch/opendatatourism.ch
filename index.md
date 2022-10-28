## Willkommen bei Open Data Tourismus

Hier werden zum Thema Open Data im Tourismus geschrieben.
Ziel ist es gemeinsam an offen Daten zu arbieten, für alle zur Verfügungstellen und diese ohne Einschränkunen nutzen zu können.
Den dies Daten sind sowieso öffentlich verfügbar.

### Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>