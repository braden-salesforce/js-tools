try {
    var m = new Map([
      ['Google Drive', 'docs.google.com'],
      ['Quip', 'quip.com'],
      ['Wiki', 'confluence.internal.salesforce.com'],
      ['GUS Headcount', 'gus.lightning.force.com/lightning/r/Headcount'],
      ['GUS ADM Work', 'gus.lightning.force.com/lightning/r/ADM_Work'],
      ['JIRA Dashboard', '/jira/secure/Dashboard'],
      ['JIRA', '/jira/'],
      ['Concierge', 'concierge.it.salesforce.com'],
      ['Slack', 'app.slack.com'],
      ['LinkedIn', 'linkedin.com/in/'],
      ['YouTube', 'youtube.com'],
      ['Google Calendar', 'calendar.google.com'],
      ['Gmail', 'mail.google.com'],
      ['OrgChart', 'orgchart.it.salesforce.com'],
      ['Lucidchart', 'lucid.app/lucidchart']
    ]);
    var supportedWebsites = Array.from(m.keys()).join(', ');
    var text = 'We only support: ' + supportedWebsites;
  
    if (location.origin.includes(m.get('Google Drive'))) {
      var url = location.origin + location.pathname;
      url = url.substr(0, url.lastIndexOf('/edit'));
      var title = document.getElementsByClassName('docs-title-input')[0];
  
      text = title.value + '\n' + url;
    } else if (location.origin.includes(m.get('Quip'))) {
      var url = location.origin + location.pathname;
      var title = document.getElementsByClassName('nav-path-title-text')[0];
  
      text = title.innerText + '\n' + url;
    } else if (location.origin.includes(m.get('Wiki'))) {
      var url = location.href;
      var title = document.getElementById('title-text').firstElementChild;
  
      text = title.innerText + '\n' + url;
    } else if (location.href.includes(m.get('GUS Headcount'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var a = wrapper.innerText.split('\n');
      var position = '';
      var hiringManager = '';
      var role = '';
      var recruiter = '';
  
      for (var i = 0; i < a.length; ++i) {
        switch(a[i]) {
          case 'Position #':
            position = a[i+1];
            break;
          case 'Hiring Manager':
            if (!hiringManager) {
              hiringManager = a[i+1];
            }
            break;
          case 'Role':
            role = a[i+1];
            break;
          case 'Recruiter':
            recruiter = a[i+1];
            break;
          default:
        }
      }
  
      text = position + ' - ' + role + ' - ' + hiringManager + ' - ' + recruiter + '\n' + url;
    } else if (location.href.includes(m.get('GUS ADM Work'))) {
        var url = location.href;
        var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
        var work = wrapper.querySelector('[slot="primaryField"]').innerText;
        var workID = wrapper.querySelector('[title="Work ID"]').nextElementSibling.innerText;
        var recordType = wrapper.querySelector('[title="Record Type"]').nextElementSibling.innerText;
        text = workID + ' - ' + recordType + ' - ' + work + '\n' + url;
    } else if (location.href.includes(m.get('JIRA Dashboard'))) {
      var url = location.href;
      var dashboard = document.getElementsByClassName('aui-page-header-main')[0];
  
      text = dashboard.innerText + '\n' + url;
    } else if (location.pathname.includes(m.get('JIRA'))) {
      var url = location.origin + location.pathname;
      var ticket = url.split('/').pop();
      var summary = document.getElementById('summary-val');
      
      text = ticket + ' - ' + summary.innerText + '\n' + url;
    } else if (location.origin.includes(m.get('Concierge'))) {
      var url = location.href;
      var ticket = document.getElementById('ticket-number');
      var topic = document.getElementById('ticket-subject');
      
      text = ticket.innerText + ' - ' + topic.innerText + '\n' + url;
    } else if (location.origin.includes(m.get('Slack'))) {
      var url = location.href;
      var channel = document.getElementsByClassName('p-view_header__channel_title p-view_header__truncated_text')[0];
      
      text = '#' + channel.innerText + '\n' + url;
    } else if (location.href.includes(m.get('LinkedIn'))) {
      var url = location.href;
      var fullName = document.getElementsByClassName('text-heading-xlarge inline t-24 v-align-middle break-words')[0];
      var headline = document.getElementsByClassName('text-body-medium break-words')[0];
      var where = document.getElementsByClassName('text-body-small inline t-black--light break-words')[0];
      
      text = fullName.innerText + ' - ' + headline.innerText + ' - ' + where.innerText + '\n' + url;
    } else if (location.origin.includes(m.get('YouTube'))) {
      var url = location.href;
      var title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0];
  
      text = title.innerText + '\n' + url;
    } else if (location.origin.includes(m.get('Google Calendar'))) {
      var subject = document.getElementById('rAECCd');
      var dateTime = document.getElementsByClassName('DN1TJ fX8Pqc CyPPBf')[0];
      var tmp = document.getElementsByClassName('w1OTme');
      if (tmp.length === 0) {
        tmp = document.getElementsByClassName('AP8Kec');
      }
      var link = tmp[0];
  
      text = subject.innerText + '\n' + dateTime.innerText + '\n' + link;
    } else if (location.origin.includes(m.get('Gmail'))) {
      var subject = document.getElementsByClassName('hP')[0];
      var from = document.getElementsByClassName('qu')[0];
      var dateTime = document.getElementsByClassName('g3')[0];
  
      text = subject.innerText + '\n' + from.innerText + '\n' + dateTime.innerText;
    } else if (location.origin.includes(m.get('OrgChart'))) {
      var folk = document.getElementById('details');
  
      text = folk.innerText;
    } else if (location.href.includes(m.get('Lucidchart'))) {
      var url = location.origin + location.pathname;
      var title = getElementById('document_title');
  
      text = title.innerText + '\n' + url;
    }
  
    var textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  } catch (err) {
    alert('Are you on the right website (' + supportedWebsites + ')?\n\n' + err);
  }
  
  var e = document.createElement('div');
  e.setAttribute('style', 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:lightblue;z-index:99999');
  e.innerText = text;
  setTimeout(function() {
    e.parentNode.removeChild(e);
  }, 2000);
  document.body.appendChild(e);