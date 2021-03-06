try {
    var m = new Map([
      ['Google Docs', 'docs.google.com'],
      ['Google Drive', 'drive.google.com'],
      ['Quip', 'quip.com'],
      ['Wiki', 'confluence.internal.salesforce.com'],
      ['GUS Headcount', 'gus.lightning.force.com/lightning/r/Headcount'],
      ['GUS ADM Work', 'gus.lightning.force.com/lightning/r/ADM_Work'],
      ['GUS ADM Epic', 'gus.lightning.force.com/lightning/r/ADM_Epic'],
      ['GUS ADM Sprint', 'gus.lightning.force.com/lightning/r/ADM_Sprint'],
      ['GUS ADM Scrum Team', 'gus.lightning.force.com/lightning/r/ADM_Scrum_Team'],
      ['GUS ADM Theme', 'gus.lightning.force.com/lightning/r/ADM_Theme__c'],
      ['GUS PPM Project', 'gus.lightning.force.com/lightning/r/PPM_Project__c'],
      ['GUS RB Retrospective', 'gus.lightning.force.com/lightning/r/RB_Retrospective'],
      ['GUS Report', 'gus.lightning.force.com/lightning/r/Report'],
      ['GUS Dashboard', 'gus.lightning.force.com/lightning/r/Dashboard'],
      ['JIRA Dashboard', '/jira/secure/Dashboard'],
      ['JIRA', '/jira/'],
      ['Concierge Ticket', 'concierge.it.salesforce.com/tickets'],
      ['Concierge Article', 'concierge.it.salesforce.com/articles'],
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
  
    if (location.origin.includes(m.get('Google Docs'))) {
      var url = location.origin + location.pathname;
      url = url.substr(0, url.lastIndexOf('/edit'));
      var title = document.getElementsByClassName('docs-title-input')[0];
  
      text = title.value + '\n' + url;
    } else if (location.origin.includes(m.get('Google Drive'))) {
      var url = location.href;
      var folders = document.getElementsByClassName('o-Yc-Wb')[0].innerText;
      var folderPath = folders.replaceAll('\n', ' > ');

      text = folderPath + '\n' + url;
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
      var team = '';
  
      for (var i = 0; i < a.length; ++i) {
        if (a[i] === 'Last Modified By') {
          break;
        }

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
          case 'Help Team':
            team = a[i+1];
            break;
          default:
        }
      }
  
      text = position + ' - ' + role + ' - ' + hiringManager + ' - ' + team + ' - ' + recruiter + '\n' + url;
    } else if (location.href.includes(m.get('GUS ADM Work'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var work = wrapper.querySelector('[slot="primaryField"]').innerText;
      var workID = wrapper.querySelector('[title="Work ID"]').nextElementSibling.innerText;
      var status = wrapper.querySelector('[title="Status"]').nextElementSibling.innerText;
      var recordType = wrapper.querySelector('[title="Record Type"]').nextElementSibling.innerText;

      var a = wrapper.innerText.split('\n');
      var priority = '';
  
      for (var i = 0; i < a.length; ++i) {
        if (a[i] === 'Last Modified By') {
          break;
        }

        switch(a[i]) {
          case 'Help Priority':
            priority = a[i+1];
            break;
          default:
        }
      }

      if (priority === '') {
        text = workID + ' - ' + status + ' - ' + recordType + ' - ' + work + '\n' + url;
      } else {
        text = workID + ' - ' + priority + ' - ' + status + ' - ' + recordType + ' - ' + work + '\n' + url;
      }
    } else if (location.href.includes(m.get('GUS ADM Epic'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var epic = wrapper.querySelector('[slot="primaryField"]').innerText;
      text = 'Epic - ' + epic + '\n' + url;
    } else if (location.href.includes(m.get('GUS ADM Sprint'))) {
      var url = location.href;
      var sprint = document.getElementsByClassName('slds-text-heading--small slds-media--rec-home__title slds-truncate')[0].innerText;
      text = 'Sprint - ' + sprint + '\n' + url;
    } else if (location.href.includes(m.get('GUS ADM Scrum Team'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var team = wrapper.querySelector('[slot="primaryField"]').innerText;
      text = 'Team - ' + team + '\n' + url;
    } else if (location.href.includes(m.get('GUS ADM Theme'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var theme = wrapper.querySelector('[slot="primaryField"]').innerText;
      text = 'Theme - ' + theme + '\n' + url;
    } else if (location.href.includes(m.get('GUS PPM Project'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var project = wrapper.querySelector('[slot="primaryField"]').innerText;
      text = 'Project - ' + project + '\n' + url;
    } else if (location.href.includes(m.get('GUS RB Retrospective'))) {
      var url = location.href;
      var wrapper = document.getElementsByClassName('oneRecordHomeFlexipage2Wrapper')[0];
      var retrospective = wrapper.querySelector('[class="slds-page-header__title slds-truncate"]').innerText;
      text = retrospective + '\n' + url;
    } else if (location.href.includes(m.get('GUS Report'))) {
      var url = location.href;
      var iframe = document.getElementsByClassName('isView reportsReportBuilder')[0];
      var report = iframe.contentWindow.document.getElementsByClassName('slds-page-header__title slds-truncate')[0].innerText;
      text = report + '\n' + url;
    } else if (location.href.includes(m.get('GUS Dashboard'))) {
      var url = location.href;
      var iframe = document.getElementsByTagName('iframe')[0];
      var dashboard = iframe.contentWindow.document.getElementsByClassName('slds-page-header__title slds-truncate')[0].innerText;
      text = dashboard + '\n' + url;
    } else if (location.href.includes(m.get('JIRA Dashboard'))) {
      var url = location.href;
      var dashboard = document.getElementsByClassName('aui-page-header-main')[0];
      text = dashboard.innerText + '\n' + url;
    } else if (location.pathname.includes(m.get('JIRA'))) {
      var url = location.origin + location.pathname;
      var ticket = url.split('/').pop();
      var summary = document.getElementById('summary-val');      
      text = ticket + ' - ' + summary.innerText + '\n' + url;
    } else if (location.href.includes(m.get('Concierge Ticket'))) {
      var url = location.href;
      var ticket = document.getElementById('ticket-number').innerText;
      var topic = document.getElementById('ticket-subject').innerText;      
      text = ticket + ' - ' + topic + '\n' + url;
    } else if (location.href.includes(m.get('Concierge Article'))) {
      var url = location.href;
      var subject = document.getElementById('content-title').innerText;      
      text = subject + '\n' + url;
    } else if (location.origin.includes(m.get('Slack'))) {
      var url = location.href;
      var channel = document.getElementsByClassName('p-view_header__channel_title p-view_header__truncated_text')[0].innerText;
      text = '#' + channel + '\n' + url;
    } else if (location.href.includes(m.get('LinkedIn'))) {
      var url = location.href;
      var fullName = document.getElementsByClassName('text-heading-xlarge inline t-24 v-align-middle break-words')[0].innerText;
      var headline = document.getElementsByClassName('text-body-medium break-words')[0].innerText;
      var where = document.getElementsByClassName('text-body-small inline t-black--light break-words')[0].innerText;
      text = fullName + ' - ' + headline + ' - ' + where + '\n' + url;
    } else if (location.origin.includes(m.get('YouTube'))) {
      var url = location.href;
      var title = document.getElementsByClassName('title style-scope ytd-video-primary-info-renderer')[0].innerText;
      text = title + '\n' + url;
    } else if (location.origin.includes(m.get('Google Calendar'))) {
      var subject = document.getElementById('rAECCd').innerText;
      var dateTime = document.getElementsByClassName('DN1TJ fX8Pqc CyPPBf')[0].innerText;
      var timezone = document.getElementById('xTimezone').innerText;
      var organizer = document.getElementById('xDetDlgCal').getElementsByClassName('ynRLnc')[0].innerText;
      var tmp = document.getElementsByClassName('w1OTme');
      if (tmp.length === 0) {
        tmp = document.getElementsByClassName('AP8Kec');
      }
      var link = tmp[0];
      text = subject + '\n' + dateTime + ' (' + timezone + ')' + '\n' + organizer + '\n' + link;
    } else if (location.origin.includes(m.get('Gmail'))) {
      var subject = document.getElementsByClassName('hP')[0].innerText;
      var from = document.getElementsByClassName('qu')[0].innerText;
      var dateTime = document.getElementsByClassName('g3')[0].innerText;
      text = subject + '\n' + from + '\n' + dateTime;
    } else if (location.origin.includes(m.get('OrgChart'))) {
      var folk = document.getElementById('details').innerText;
      text = folk;
    } else if (location.href.includes(m.get('Lucidchart'))) {
      var url = location.origin + location.pathname;
      var title = document.getElementById('document_title').innerText;
      text = title + '\n' + url;
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