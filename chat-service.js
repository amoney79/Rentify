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
                wrapper.className = 'chat-message-row ${isMine ? 'mine' : 'theirs'}';
            }
        }
    }
}