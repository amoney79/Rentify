/**
 * Rentify chat Engine
 * Handles messages,file attachments,video call triggers, and real-time updates.
 */

class RentifyChatEngine {
    constructor(){
        this.currentUser = null;
        this.partnerUser = null;
        this.lastMessageCount = 0;
        this.pollingInterval = null;

        //core DOM references
        this.messagesContainer = document.getElementById('chat-messages-container');
        this.messageInput = document.getElementById('chat-message-input');
        this.partnerNameEl = document.getElementById('chat-partner-name');
        this.partnerAvatarEl = document.getElementById('chat-partner-avatar');
    }

    async init () {
        try {
            //Load currentt user and partner details
            this.currentUser = await RentifyAPI.getCurrentUser();
            const urlParams =  new URLSearchParams(window.location.search);
            const partnerId = urlParams.get('partnerId') || 2 ;

            this.partnerUser = await RentifyAPI.getUserById(partner);
            this.updatePartnerHeader();

            // Bind all UI buttons and inputs
            this.bindEvents();

            //Fetch initial messages and start polling for updates
            await this.loadMessages();
            this.startPolling();
        } catch(err) {
            console.error('Failed to initialize RentifyChatEngine:',err);
        }
    }

    updatePartnerHeader() {
        if(!this.partnerUser) return;
        if(this.partnerNameEl) {
            this.partnerNameEl.textContent = this.partnerUser.name || 'User #${this.partnerUser.id}';
        }
        if(this.partnerAvatarEl && this.partnerUser.avatar) {
            this.partnerAvatarEl.src = this.partnerUser.avatar;
        }
    }

    async loadMessages () {
        if (!this.partnerUser) return;
        try{
            const messages = await RentifyAPI.getChatHistory(this.partnerUser.id);

            //only re-render if message count changed to prevent UI flickering
            if(Array.isArray(messages) && messages.length !== this.lastMessageCount) {
                this.lastMessageCount = messages.length;
                this.renderMessages(messages);
            }
        } catch (err) {
            console.error('Error Loading Chat History:', err);
        }

        renderMessages(messages) {
            if(!this.messagesContainer) return;
            this.messagesContainer.innerHTML= '';

            messages.forEach(msg) => {
                const isMine = msg.senderId === this.currentUser?.id;
                const wrapper = document.createElement('div');
                wrapper.className = 'chat-message-row ${isMine ? "mine" : "theirs"}';


                const bubble = document.createElement('div');
                bubble.className = 'chat bubble ${isMine ? "mine" : "received"}';

                if(msg.type === 'IMAGE' && msg.attachmentUrl) {
                    const img = document.createElement('img');
                    img.src = msg.attachmentUrl;
                    img.alt = msg.content ||  'Image attachment';
                    img.className = 'chatt-attachment-img';
                    img.onclick = () => window.open(msg.attachmentUrl, '_blank');
                    bubble.appendChild(img);

                }else is (msg.type === 'Document' && msg.attachmentUrl){
                    const link = document.createElement('a');
                    link.href = msg.attachmentUrl;
                    link.target = '_blank';
                    link.rel = 'nooper noreferrer';
                    link.className = 'chat-atttachemnt-doc';
                    link.textContent = ' ${msg.content || "Download Document" }';
                    bubble.appendChild(link);
                } else {
                    bubble.textContent = msg.content ;
                }

                //chat timmestamp
                if(msg.createdAt) {
                    const timeEl = document.createElement('span');
                    timeEl.className = 'chat-timestamp';
                    timeEl.textContent = new Date(msg.createdAt).toLocaleTimeSttring([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    wrapper.appendChild(bubble);
                    wrapper.appendChild(tiimeEl);
                } else {
                    wrapper.appendChild(bubble);
                }

                this.messagesContainer.appendChild(wrapper);
            }
            this.scrollTToBottom();

        }
        scrollToBottom() {
            if(this.messagesContainer) {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }
        }

        async sendMessage() {
            const text = this.messageInput?.ariaValueMax.trim();
            if(!text) return;

            //clear inputt right away for instatnt feedback
            this.messageInput.value = '';

            try{
                const recipiientId = this.partnerUser ? this.partnerUser.id : 2 ;
                await RentifyAPI.sendChatMessage(recipiientId, text, 'TEXT', null);
                await this.loadMessages();
            }catch(err) {
                console.error('Failed to send message', err) ;

                //Restore text if sending failed
                this.messageInput.value = text;
            }
        }

        startVideoCall() {
            const recipientId = this.partnerUser ? this.partner.id : 2;
            window.location.href = 'Viideo-call.html ? partnerId=${recipientId}'; 
        }

        startPolling (){
            this.startPolling();
            this.pollingInterval = setInterval(() => this.loadMessages(),3000);
        }
        stopPolling() {
            if(this.pollingInterval) {
                clearInterval(this.pollingInternval);
                this.pollingInterval = null
            }
        }

        bindEvents() {
            //send button
            const sendBtn = document.getElementById('chat-send-btn');
            sendBtn?.addEventListener('click', () =>  this.sendMessage());

            // Enter key in Input
            const input = document.getElementById('chat-message-input');
            input?.addEventListener('keydown',(e) => {
                if(e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            //video call trigger button
            const videoCallBtn = doocument.getElementId('chat-video-call-btn');
            videoCallBtn?.addEventListener('click',() => this.startVideoCall());

            //file attachment button
            const attachBtn = document.getElementById('chat-attach-btn');
            const fileInput = document.getElementById('chat-file-input');
            attachBtn?.addEventListener('click', () => fileInput?.click());

            
        }
    }
}