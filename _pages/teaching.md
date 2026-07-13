---
layout: page
permalink: /teaching/
title: Teaching
nav: true
nav_order: 6
---

{% assign instructor_section = site.data.cv | where_exp: "section", "section.title == 'Teaching (Instructor of Record)'" | first %}
{% assign ta_section = site.data.cv | where_exp: "section", "section.title == 'Teaching (Teaching Assistant)'" | first %}

<div class="teaching-list">
  {% if instructor_section and instructor_section.contents and instructor_section.contents.size > 0 %}
    <h2 class="teaching-group">Instructor of Record</h2>
    {% for teaching in instructor_section.contents %}
      <div class="teaching-item">
        <div class="teaching-title">
          {{ teaching.title }}
          {% if teaching.year %}<span class="teaching-year">{{ teaching.year }}</span>{% endif %}
        </div>
        {% if teaching.institution %}<div class="teaching-institution">{{ teaching.institution }}</div>{% endif %}
      </div>
    {% endfor %}
  {% endif %}

  {% if ta_section and ta_section.contents and ta_section.contents.size > 0 %}
    <h2 class="teaching-group">Teaching Assistant</h2>
    {% for teaching in ta_section.contents %}
      <div class="teaching-item">
        <div class="teaching-title">
          {{ teaching.title }}
          {% if teaching.year %}<span class="teaching-year">{{ teaching.year }}</span>{% endif %}
        </div>
        {% if teaching.institution %}<div class="teaching-institution">{{ teaching.institution }}</div>{% endif %}
      </div>
    {% endfor %}
  {% endif %}

  {% assign has_instructor = instructor_section.contents.size | default: 0 %}
  {% assign has_ta = ta_section.contents.size | default: 0 %}
  {% if has_instructor == 0 and has_ta == 0 %}
    <p>No teaching experience is currently listed in the CV data.</p>
  {% endif %}
</div>
